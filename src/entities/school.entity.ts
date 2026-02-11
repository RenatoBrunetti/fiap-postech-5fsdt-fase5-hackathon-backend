import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

// Models
import { ISchool } from './models/school.interface.js';

// Entities
import { Class } from './class.entity.js';

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

  @OneToMany('Class', (classe: Class) => classe.school)
  classes?: Class[];

  constructor(partial?: Partial<School>) {
    if (partial) Object.assign(this, partial);
  }
}
