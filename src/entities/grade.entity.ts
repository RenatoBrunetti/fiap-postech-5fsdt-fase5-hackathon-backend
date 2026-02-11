import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

// Models
import { IGrade } from './models/grade.interface.js';

// Entities
import { Class } from './class.entity.js';

@Entity('Grade')
export class Grade implements IGrade {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ type: 'text' })
  name!: string;
  @Column({ type: 'text' })
  category!: string;
  @Column({ default: true, type: 'boolean' })
  active!: boolean;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany('Class', (classe: Class) => classe.grade)
  classes?: Class[];

  constructor(partial?: Partial<Grade>) {
    if (partial) Object.assign(this, partial);
  }
}
