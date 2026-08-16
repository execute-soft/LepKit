import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('orgs')
export class Org {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  business_name!: string;

  @Column({ nullable: true })
  legal_name!: string;

  @Column({ type: 'uuid', nullable: true })
  company_address_id!: string;

  @Column({ default: 'active' })
  status!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;

  @ManyToOne('Address', { nullable: true })
  @JoinColumn({ name: 'company_address_id' })
  companyAddress!: any;
}
