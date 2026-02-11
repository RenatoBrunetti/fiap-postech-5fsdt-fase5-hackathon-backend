import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

// Models
import { IUser } from './models/user.interface.js';

// Entities
import type { Role } from './role.entity.js';
import type { RefreshToken } from './refreshToken.entity.js';
import { ClassUser } from './classUser.entity.js';

@Entity('User')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ unique: true, type: 'text' })
  email!: string;
  @Column({ select: false, type: 'text' })
  password?: string;
  @Column({ type: 'text' })
  name!: string;
  @Column({ unique: true, type: 'text' })
  document!: string;
  @Column({ default: true, type: 'boolean' })
  active?: boolean;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
  @Column({ type: 'uuid' })
  roleId!: string;

  @ManyToOne('Role', (role: Role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role?: Role;

  @OneToMany('RefreshToken', (refreshToken: RefreshToken) => refreshToken.user)
  refreshTokens?: RefreshToken[];

  @OneToMany('ClassUser', (classUser: ClassUser) => classUser.user)
  classUsers?: ClassUser[];

  constructor(partial?: Partial<User>) {
    if (partial) Object.assign(this, partial);
  }
}
