import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

// Models
import { ISchoolUser } from './models/schoolUser.interface.js';

// Entities
import { School } from './school.entity.js';
import { User } from './user.entity.js';

@Entity('SchoolUser')
@Unique('unq_school_user', ['schoolId', 'userId'])
export class SchoolUser implements ISchoolUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ type: 'date' })
  startDate!: Date;
  @Column({ type: 'date', nullable: true })
  endDate?: Date;
  @Column({ type: 'enum', enum: ['TEACHER', 'STUDENT'] })
  status!: 'TEACHER' | 'STUDENT';
  @Column({ default: true, type: 'boolean' })
  active!: boolean;
  @Column({ type: 'uuid' })
  schoolId!: string;
  @Column({ type: 'uuid' })
  userId!: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'schoolId' })
  school?: School;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  constructor(partial?: Partial<SchoolUser>) {
    if (partial) Object.assign(this, partial);
  }
}
