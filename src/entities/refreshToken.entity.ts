import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// Models
import { IRefreshToken } from './models/refreshToken.interface.js';

// Entities
import type { User } from './user.entity.js';

@Entity('RefreshToken')
export class RefreshToken implements IRefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ unique: true, type: 'text' })
  token!: string;
  @Column({ type: 'timestamptz' })
  expiresAt!: Date;
  @Column({ type: 'uuid' })
  userId!: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ManyToOne('User', (user: User) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: User;

  constructor(partial?: Partial<RefreshToken>) {
    if (partial) Object.assign(this, partial);
  }
}
