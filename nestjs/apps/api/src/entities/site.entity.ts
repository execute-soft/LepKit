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

@Entity('sites')
export class Site {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  org_id!: string;

  @Column({ type: 'uuid', unique: true, nullable: true })
  domain_id!: string;

  @Column()
  name!: string;

  @Column()
  code!: string;

  @Column({ nullable: true })
  types!: string;

  @Column({ default: 'active' })
  status!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;

  @ManyToOne('Org', { nullable: true })
  @JoinColumn({ name: 'org_id' })
  org!: any;
}
