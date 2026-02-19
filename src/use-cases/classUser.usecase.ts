import { IClassUserRepository } from '../repositories/classUser.repository.interface.js';
import { IUserRepository } from '../repositories/user.repository.interface.js';
import { IClassRepository } from '../repositories/class.repository.interface.js';

import { ApiError } from '../http/errors/api.errors.js';

import { IClassUser } from '../entities/models/classUser.interface.js';

export interface AssignUserRequest {
  userId: string;
  classId: string;
  startDate?: Date;
}

export class ClassUserUseCase {
  constructor(
    private classUserRepository: IClassUserRepository,
    private userRepository: IUserRepository,
    private classRepository: IClassRepository,
  ) {}

  async assign(data: AssignUserRequest): Promise<IClassUser | null> {
    // 1. Check existing class (Gatekeeper)
    const classExists = await this.classRepository.findById(data.classId);
    if (!classExists) {
      throw new ApiError('Class not found', 404);
    }

    // 2. Check existing user (Join)
    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    // 3. Gatekeeper validation (Gatekeeper)
    // Check if the user's role allows them to be in a class
    const allowedRoles = ['Student', 'Teacher', 'Admin'];
    const userRole = user.role?.name;

    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new ApiError(
        `Users with role '${userRole || 'Unknown'}' cannot be assigned to classes`,
        403,
      );
    }

    // 4. Check if the assignment already exists (Avoid database 500 error due to Unique Constraint)
    const alreadyAssigned = await this.classUserRepository.findByUserAndClass(
      data.userId,
      data.classId,
    );

    if (alreadyAssigned) {
      throw new ApiError('User is already assigned to this class', 409);
    }

    // 5. Persist the assignment (Without the status field, as requested)
    const assignment = await this.classUserRepository.create({
      userId: data.userId,
      classId: data.classId,
      startDate: data.startDate || new Date(),
      active: true,
    });

    // 6. Refetch: Return the created assignment with all details (class and user)
    return await this.classUserRepository.findByIdWithDetails(assignment.id!);
  }

  async unassign(data: {
    userId: string;
    classId: string;
    endDate?: Date;
  }): Promise<void> {
    // 1. Check if the assignment exists
    const existingAssignment =
      await this.classUserRepository.findByUserAndClass(
        data.userId,
        data.classId,
      );
    if (!existingAssignment) {
      throw new ApiError('Assignment not found', 404);
    }

    // 2. Unassign the user from the class (soft delete by setting active to false and endDate)
    const updatePayload = {
      active: false,
      endDate: data.endDate || new Date(),
    };

    await this.classUserRepository.update(
      existingAssignment.id!,
      updatePayload,
    );
  }

  async findByUser(userId: string): Promise<IClassUser[]> {
    // 1. Check if user exists (Gatekeeper)
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    // 2. Fetch all class-user assignments for the user
    const classUsers = await this.classUserRepository.findAllByUserId(userId);

    return classUsers;
  }
}
