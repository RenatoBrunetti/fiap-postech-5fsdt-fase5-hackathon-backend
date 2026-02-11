import { IGrade } from './grade.interface.js';
import { ISchool } from './school.interface.js';

export interface IClass {
  id: string;
  name: string;
  year: number;
  active: boolean;
  schoolId: string;
  gradeId: string;
  createdAt: Date;
  updatedAt: Date;
  school?: ISchool;
  grade?: IGrade;
}
