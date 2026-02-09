import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

// Models
import { IRole } from './models/role.interface.js';

// Entities
import { User } from './user.entity.js';

@Entity('Role')
export class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ unique: true, type: 'text' })
  name!: string;
  @Column({ type: 'text', nullable: true })
  description?: string;
  @Column({ default: true, type: 'boolean' })
  active!: boolean;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];

  constructor(partial?: Partial<Role>) {
    if (partial) Object.assign(this, partial);
  }
}
