import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Org } from '../entities/org.entity';
import { Site } from '../entities/site.entity';
import { User } from '../entities/user.entity';
import { OrgsService } from './orgs.service';
import { OrgOnboardingService } from './org-onboarding.service';
import { OrgsController } from './orgs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Org, Site, User])],
  controllers: [OrgsController],
  providers: [OrgsService, OrgOnboardingService],
  exports: [OrgsService],
})
export class OrgsModule {}
