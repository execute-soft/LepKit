import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto, AdminUpdateUserDto } from './dto/update-user.dto';

// Lite version: basic user CRUD.
// Full version adds organization cleanup, webhook deletion, GDPR cascading deletes,
// subscription stats, and file upload handling.
// Get it at: https://demo.cloudrix.io

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll(page = 1, limit = 10, search?: string) {
    const qb = this.userRepo.createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.firstName', 'user.lastName', 'user.avatar', 'user.role', 'user.isEmailVerified', 'user.createdAt', 'user.updatedAt'])
      .where('user.deleted_at IS NULL')
      .orderBy('user.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search) {
      qb.andWhere('user.email ILIKE :search OR user.firstName ILIKE :search OR user.lastName ILIKE :search', { search: `%${search}%` });
    }

    const [data, total] = await qb.getManyAndCount();

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'avatar', 'role', 'isEmailVerified', 'createdAt', 'updatedAt'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(id: string, dto: UpdateUserDto | AdminUpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, dto);
    await this.userRepo.save(user);
    return user;
  }

  async delete(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepo.softDelete(id);
    return { message: 'User deleted successfully' };
  }

  async getStats() {
    const totalUsers = await this.userRepo.count();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const newThisMonth = await this.userRepo
      .createQueryBuilder('user')
      .where('user.deleted_at IS NULL')
      .andWhere('user.createdAt >= :firstOfMonth', { firstOfMonth })
      .getCount();

    return { totalUsers, newThisMonth };
  }
}
