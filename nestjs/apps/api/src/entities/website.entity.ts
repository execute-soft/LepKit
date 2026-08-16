import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('websites')
export class Website {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  key!: string;

  @Column()
  name!: string;

  @Column()
  framework!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: 'active' })
  status!: string;

  @Column()
  version!: string;

  @Column()
  cdn_url!: string;

  @Column({ nullable: true })
  manifest_url!: string;

  @Column({ nullable: true })
  asset_prefix!: string;

  @Column({ nullable: true })
  checksum!: string;

  @Column({ nullable: true })
  deployed_by!: string;

  @Column({ type: 'timestamptz' })
  deployed_at!: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;
}
