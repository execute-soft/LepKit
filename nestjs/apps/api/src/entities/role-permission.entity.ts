import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity('role_permissions')
@Unique(['role_id', 'permission_id'])
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  role_id!: string;

  @Column({ type: 'uuid' })
  permission_id!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at!: Date;

  @ManyToOne('Role')
  @JoinColumn({ name: 'role_id' })
  role!: any;

  @ManyToOne('Permission')
  @JoinColumn({ name: 'permission_id' })
  permission!: any;
}
