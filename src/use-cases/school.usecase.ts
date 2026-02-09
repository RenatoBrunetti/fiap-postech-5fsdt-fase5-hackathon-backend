import { ISchool } from '../entities/models/school.interface.js';
import { ISchoolRepository } from '../repositories/school.repository.interface.js';

import { ApiError } from '../http/errors/api.errors.js';

export class SchoolUseCase {
  constructor(private schoolRepository: ISchoolRepository) {}

  async create(data: Partial<ISchool>): Promise<ISchool> {
    // Rule: A school with the same document cannot be created
    if (data.document) {
      const schoolExists = await this.schoolRepository.findByDocument(
        data.document,
      );
      if (schoolExists) {
        throw new ApiError('School with this document already exists', 409);
      }
    }

    return await this.schoolRepository.create(data);
  }

  async findAll(): Promise<ISchool[]> {
    return await this.schoolRepository.findAll();
  }
}
