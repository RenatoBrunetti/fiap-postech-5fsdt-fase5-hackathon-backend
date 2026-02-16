import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Class } from './class.entity.js';
import { User } from './user.entity.js';

import { IClassUser } from './models/classUser.interface.js';

@Entity('ClassUser')
export class ClassUser implements IClassUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({ type: 'date' })
  startDate!: Date;
  @Column({ type: 'date', nullable: true })
  endDate?: Date | null;
  @Column({ default: true, type: 'boolean' })
  active!: boolean;
  @Column({ type: 'uuid' })
  classId!: string;
  @Column({ type: 'uuid' })
  userId!: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne('User', (user: User) => user.classUsers)
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToOne('Class', (classEntity: Class) => classEntity.classUsers)
  @JoinColumn({ name: 'classId' })
  class?: Class;

  constructor(partial?: Partial<ClassUser>) {
    if (partial) Object.assign(this, partial);
  }
}
