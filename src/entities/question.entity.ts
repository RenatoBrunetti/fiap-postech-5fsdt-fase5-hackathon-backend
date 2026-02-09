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
import { IQuestion } from './models/question.interface.js';

// Entities
import { Feedback } from './feedback.entity.js';

@Entity('Question')
export class Question implements IQuestion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ type: 'text' })
  title!: string;
  @Column({ type: 'text', nullable: true })
  description?: string;
  @Column({ type: 'int' })
  order!: number;
  @Column({ default: true, type: 'boolean' })
  active!: boolean;
  @Column({ type: 'uuid' })
  feedbackId!: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => Feedback, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'feedbackId' })
  feedback?: Feedback;

  constructor(partial?: Partial<Question>) {
    if (partial) Object.assign(this, partial);
  }
}
