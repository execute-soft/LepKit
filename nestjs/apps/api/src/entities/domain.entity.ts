import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

@Entity('domains')
export class Domain {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  @Index()
  site_id!: string;

  @Column()
  host!: string;

  @Column()
  type!: string;

  @Column({ default: false })
  is_primary!: boolean;

  @Column({ default: false })
  is_varified!: boolean;

  @Column({ default: false })
  dns_enable!: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  verified_at!: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;

  @ManyToOne('Site')
  @JoinColumn({ name: 'site_id' })
  site!: any;
}
