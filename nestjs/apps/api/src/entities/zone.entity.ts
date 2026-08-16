import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  code!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  type!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitude!: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;
}
