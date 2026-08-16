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
  Unique,
} from 'typeorm';

@Entity('roles')
@Unique(['site_id', 'slug'])
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  @Index()
  site_id!: string;

  @Column()
  name!: string;

  @Column()
  slug!: string;

  @Column({ default: 'site' })
  scope!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: false })
  is_system!: boolean;

  @Column({ default: 'active' })
  status!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;

  @ManyToOne('Site')
  @JoinColumn({ name: 'site_id' })
  site!: any;
}
