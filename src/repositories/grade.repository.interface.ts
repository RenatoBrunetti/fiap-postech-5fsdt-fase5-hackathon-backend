import { IGrade } from '../entities/models/grade.interface.js';

export interface IGradeRepository {
  findAll(): Promise<IGrade[]>;
  findById(id: string): Promise<IGrade | null>;
  findByName(name: string): Promise<IGrade[]>;
  findByCategory(category: string): Promise<IGrade[]>;
}
