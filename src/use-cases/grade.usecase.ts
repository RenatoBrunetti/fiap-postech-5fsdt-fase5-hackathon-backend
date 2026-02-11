import { IGrade } from '../entities/models/grade.interface.js';
import { IGradeRepository } from '../repositories/grade.repository.interface.js';

export class GradeUseCase {
  constructor(private gradeRepository: IGradeRepository) {}

  async findAll(): Promise<IGrade[]> {
    return await this.gradeRepository.findAll();
  }

  async findById(id: string): Promise<IGrade | null> {
    return await this.gradeRepository.findById(id);
  }

  async findByName(name: string): Promise<IGrade[]> {
    return await this.gradeRepository.findByName(name);
  }

  async findByCategory(category: string): Promise<IGrade[]> {
    return await this.gradeRepository.findByCategory(category);
  }
}
