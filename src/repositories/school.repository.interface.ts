import { ISchool } from '../entities/models/school.interface.js';

export interface ISchoolRepository {
  findAll(): Promise<ISchool[]>;
  findByDocument(document: string): Promise<ISchool | null>;
  create(data: Partial<ISchool>): Promise<ISchool>;
}
