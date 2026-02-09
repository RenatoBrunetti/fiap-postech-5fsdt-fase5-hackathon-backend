import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Models
import { IGrade } from './models/grade.interface.js';

@Entity('Grade')
export class Grade implements IGrade {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ unique: true, type: 'text' })
  name!: string;
  @Column({ type: 'text' })
  category!: string;
  @Column({ default: true, type: 'boolean' })
  active!: boolean;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  constructor(partial?: Partial<Grade>) {
    if (partial) Object.assign(this, partial);
  }
}
