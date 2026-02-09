import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Models
import { ISchool } from './models/school.interface.js';

@Entity('School')
export class School implements ISchool {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ unique: true, type: 'text' })
  name!: string;
  @Column({ unique: true, type: 'text' })
  document!: string;
  @Column({ default: true, type: 'boolean' })
  active!: boolean;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  constructor(partial?: Partial<School>) {
    if (partial) Object.assign(this, partial);
  }
}
