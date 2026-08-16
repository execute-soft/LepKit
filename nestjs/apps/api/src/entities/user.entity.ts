import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'site_id', type: 'uuid', nullable: true })
  @Index()
  siteId!: string;

  @Column({ unique: true })
  @Index()
  email!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ name: 'password_hash' })
  @Exclude()
  password!: string;

  @Column({ default: 'staff' })
  principal_type!: string;

  @Column({ type: 'uuid' })
  role_id!: string;

  @Column({ default: 'user' })
  role!: string;

  @Column({ type: 'jsonb', default: '{}' })
  permissions!: object;

  @Column({ default: 1 })
  permissions_version!: number;

  @Column({ default: 'active' })
  status!: string;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({ nullable: true })
  avatar!: string;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column({ nullable: true })
  @Exclude()
  emailVerificationToken!: string;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  emailVerificationExpires!: Date;

  @Column({ nullable: true })
  @Exclude()
  passwordResetToken!: string;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  passwordResetExpires!: Date;

  @Column({ nullable: true, unique: true })
  googleId!: string;

  @Column({ nullable: true })
  @Exclude()
  twoFactorSecret!: string;

  @Column({ default: false })
  twoFactorEnabled!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  twoFactorEnabledAt!: Date;

  @Column({ nullable: true })
  @Exclude()
  twoFactorSessionToken!: string;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  twoFactorSessionExpires!: Date;

  @Column({ type: 'text', array: true, nullable: true })
  @Exclude()
  recoveryCodeHashes!: string[];

  @Column({ nullable: true })
  stripeCustomerId!: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken!: string;

  @Column({ nullable: true })
  @Exclude()
  oauthCode!: string;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  oauthCodeExpires!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deleted_at!: Date;

  @ManyToOne('Site', { nullable: true })
  @JoinColumn({ name: 'site_id' })
  site!: any;
}
