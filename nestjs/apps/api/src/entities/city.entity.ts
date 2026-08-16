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

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  state_id!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitude!: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude!: number;

  @Column({ nullable: true })
  timezone_name!: string;

  @Column({ default: false })
  is_capital!: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;

  @ManyToOne('State', { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state!: any;
}
