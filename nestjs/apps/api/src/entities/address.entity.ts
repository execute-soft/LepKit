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

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  address_line!: string;

  @Column({ type: 'uuid', nullable: true })
  country_id!: string;

  @Column({ type: 'uuid', nullable: true })
  state_id!: string;

  @Column({ type: 'uuid', nullable: true })
  city_id!: string;

  @Column({ nullable: true })
  zip_code!: string;

  @Column({ default: false })
  is_primary!: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;

  @ManyToOne('Country', { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country!: any;

  @ManyToOne('State', { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state!: any;

  @ManyToOne('City', { nullable: true })
  @JoinColumn({ name: 'city_id' })
  city!: any;
}
