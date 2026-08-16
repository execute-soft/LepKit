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

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'char', length: 2, nullable: true })
  iso_alpha2!: string;

  @Column({ type: 'char', length: 3, nullable: true })
  iso_alpha3!: string;

  @Column({ type: 'smallint', nullable: true })
  iso_numeric!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  capital!: string;

  @Column({ type: 'uuid', nullable: true })
  zone_id!: string;

  @Column({ type: 'char', length: 3, nullable: true })
  currency_code!: string;

  @Column({ nullable: true })
  phone_code!: string;

  @Column({ type: 'bigint', nullable: true })
  population!: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitude!: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude!: number;

  @Column({ nullable: true })
  flag_url!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;

  @ManyToOne('Zone', { nullable: true })
  @JoinColumn({ name: 'zone_id' })
  zone!: any;
}
