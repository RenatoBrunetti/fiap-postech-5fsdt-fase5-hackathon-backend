import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

// Models
import { IClass } from './models/class.interface.js';

// Entities
import { School } from './school.entity.js';
import { Grade } from './grade.entity.js';
import { ClassUser } from './classUser.entity.js';

@Entity('Class')
export class Class implements IClass {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ type: 'text' })
  name!: string;
  @Column({ type: 'int' })
  year!: number;
  @Column({ default: true, type: 'boolean' })
  active!: boolean;
  @Column({ type: 'uuid' })
  schoolId!: string;
  @Column({ type: 'uuid' })
  gradeId!: string;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne('School', (school: School) => school.classes)
  @JoinColumn({ name: 'schoolId' })
  school?: School;

  @ManyToOne('Grade', (grade: Grade) => grade.classes)
  @JoinColumn({ name: 'gradeId' })
  grade?: Grade;

  @OneToMany('ClassUser', (classUser: ClassUser) => classUser.class)
  classUsers?: ClassUser[];

  constructor(partial?: Partial<Class>) {
    if (partial) Object.assign(this, partial);
  }
}
