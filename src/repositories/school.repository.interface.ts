import { ISchool } from '../entities/models/school.interface.js';

export interface ISchoolRepository {
  findAll(): Promise<ISchool[]>;
  findById(id: string): Promise<ISchool | null>;
  findByDocument(document: string): Promise<ISchool | null>;
  create(data: Partial<ISchool>): Promise<ISchool>;
  delete(id: string): Promise<void>;
}
