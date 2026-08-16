import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

@Entity('staff_profiles')
export class StaffProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', unique: true })
  user_id!: string;

  @Column({ type: 'uuid' })
  @Index()
  site_id!: string;

  @Column({ nullable: true })
  employee_code!: string;

  @Column({ nullable: true })
  first_name!: string;

  @Column({ nullable: true })
  last_name!: string;

  @Column({ nullable: true })
  display_name!: string;

  @Column({ nullable: true })
  department!: string;

  @Column({ nullable: true })
  designation!: string;

  @Column({ default: 'staff' })
  staff_type!: string;

  @Column({ default: 'active' })
  employment_status!: string;

  @Column({ type: 'date', nullable: true })
  joined_at!: Date;

  @Column({ type: 'date', nullable: true })
  left_at!: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;

  @OneToOne('User')
  @JoinColumn({ name: 'user_id' })
  user!: any;

  @ManyToOne('Site')
  @JoinColumn({ name: 'site_id' })
  site!: any;
}
