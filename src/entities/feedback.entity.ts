import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// Models
import { IFeedback } from './models/feedback.interface.js';

// Entities
import { Class } from './class.entity.js';
import { User } from './user.entity.js';

@Entity('Feedback')
export class Feedback implements IFeedback {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ type: 'text' })
  title!: string;
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

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'classId' })
  class?: Class;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user?: User;

  constructor(partial?: Partial<Feedback>) {
    if (partial) Object.assign(this, partial);
  }
}
