import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Org } from '../entities/org.entity';
import { UpdateOrgDto } from './dto/update-org.dto';
import { UpdateOrgStatusDto } from './dto/update-status.dto';

@Injectable()
export class OrgsService {
  constructor(
    @InjectRepository(Org) private orgRepo: Repository<Org>,
  ) {}

  async findAll(page = 1, limit = 10, search?: string) {
    const qb = this.orgRepo.createQueryBuilder('org')
      .where('org.deleted_at IS NULL')
      .orderBy('org.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search) {
      qb.andWhere('org.business_name ILIKE :search OR org.legal_name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    const org = await this.orgRepo.findOne({ where: { id } });
    if (!org) throw new NotFoundException('Organization not found');
    return org;
  }

  async update(id: string, dto: UpdateOrgDto) {
    const org = await this.orgRepo.findOne({ where: { id } });
    if (!org) throw new NotFoundException('Organization not found');

    Object.assign(org, dto);
    return this.orgRepo.save(org);
  }

  async updateStatus(id: string, dto: UpdateOrgStatusDto) {
    const org = await this.orgRepo.findOne({ where: { id } });
    if (!org) throw new NotFoundException('Organization not found');

    org.status = dto.status;
    return this.orgRepo.save(org);
  }
}
