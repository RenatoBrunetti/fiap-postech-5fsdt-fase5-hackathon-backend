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
import { IAnswer } from './models/answer.interface.js';

// Entities
import { Question } from './question.entity.js';
import { User } from './user.entity.js';

@Entity('Answer')
export class Answer implements IAnswer {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ type: 'text' }) outcome!: string;
  @Column({ default: true, type: 'boolean' }) active!: boolean;
  @Column({ type: 'uuid' }) questionId!: string;
  @Column({ type: 'uuid' }) userId!: string;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questionId' })
  question?: Question;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user?: User;

  constructor(partial?: Partial<Answer>) {
    if (partial) Object.assign(this, partial);
  }
}
