import { Injectable, ConflictException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { Org } from '../entities/org.entity';
import { Site } from '../entities/site.entity';
import { User } from '../entities/user.entity';
import { RegisterOrgDto } from './dto/register-org.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class OrgOnboardingService {
  constructor(
    private dataSource: DataSource,
    private emailService: EmailService,
  ) { }

  async registerOrg(dto: RegisterOrgDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userRepo = queryRunner.manager.getRepository(User);

      const existing = await userRepo.findOne({ where: { email: dto.admin_email } });
      if (existing) {
        throw new ConflictException('Admin email already registered');
      }

      const org = queryRunner.manager.create(Org, {
        business_name: dto.business_name,
        legal_name: dto.legal_name,
      });
      const savedOrg = await queryRunner.manager.save(org);

      const siteCode = dto.business_name.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 30);
      const site = queryRunner.manager.create(Site, {
        org_id: savedOrg.id,
        name: dto.business_name,
        code: siteCode,
        types: 'web',
      });
      const savedSite = await queryRunner.manager.save(site);

      const hashedPassword = await bcrypt.hash(dto.admin_password, 12);
      const emailVerificationToken = uuidv4();
      const emailVerificationExpires = new Date(Date.now() + 24 * 3600000);

      const user = userRepo.create({
        siteId: savedSite.id,
        email: dto.admin_email,
        password: hashedPassword,
        firstName: dto.admin_firstName,
        lastName: dto.admin_lastName,
        role: 'admin',
        principal_type: 'staff',
        emailVerificationToken,
        emailVerificationExpires,
      });
      await userRepo.save(user);

      await queryRunner.commitTransaction();

      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

      await this.emailService.sendWelcomeEmail(user.email, user.firstName || 'there');
      await this.emailService.sendEmailVerification(
        user.email,
        `${frontendUrl}/verify-email?token=${emailVerificationToken}`,
      );

      return {
        message: 'Organization registered successfully. Please check your email to verify your account.',
        org: savedOrg,
        site: savedSite,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
