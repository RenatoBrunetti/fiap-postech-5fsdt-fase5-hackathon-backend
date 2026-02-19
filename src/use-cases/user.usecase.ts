import { IUser } from '../entities/models/user.interface.js';

import { hashPassword } from '../lib/bcrypt/hash-password.js';

import { IClassRepository } from '../repositories/class.repository.interface.js';
import { IClassUserRepository } from '../repositories/classUser.repository.interface.js';
import { IRoleRepository } from '../repositories/role.repository.interface.js';
import { IUserRepository } from '../repositories/user.repository.interface.js';

export class UserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
    private classRepository: IClassRepository,
    private classUserRepository: IClassUserRepository,
  ) {}

  async findAll(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async findAllByRoleName(roleName: string): Promise<IUser[]> {
    const users = await this.userRepository.findAll();
    return users.filter((user) => user.role?.name === roleName);
  }

  async findAllBySchool(schoolId: string, roleName: string): Promise<IUser[]> {
    const classes = await this.classRepository.findAllBySchool(schoolId);
    if (!classes.length) {
      return [];
    }
    const classIds = classes.map((c) => c.id);
    const classUsers =
      await this.classUserRepository.findAllByClassIds(classIds);
    if (!classUsers.length) {
      return [];
    }
    const userIds = classUsers.map((cu) => cu.userId);
    const users = await this.userRepository.findAllByIds(userIds);
    return users.filter((user) => user.role?.name === roleName);
  }

  async searchUsers(roleName: string, searchQuery: string): Promise<IUser[]> {
    const role = await this.roleRepository.findByName(roleName);
    if (!role) throw new Error('Role not found');
    const users = await this.userRepository.searchUsers({
      roleId: role.id,
      searchQuery,
    });
    return roleName === 'Student'
      ? users.filter(
          (user) =>
            (user.classUsers && user.classUsers.every((cu) => !cu.active)) ||
            !user.classUsers ||
            user.classUsers.length === 0,
        )
      : users;
  }

  async findByClass(classId: string, roleName: string): Promise<IUser[]> {
    const classUsers = await this.classUserRepository.findByClass(classId);
    if (!classUsers.length) {
      return [];
    }
    const classUserIds = classUsers.map((cu) => cu.userId);
    const users = await this.userRepository.findAllByIds(classUserIds);
    return users.filter((user) => user.role?.name === roleName);
  }

  async create(user: IUser): Promise<IUser> {
    // Password validation (redundancy)
    if (!user.password) throw new Error('Password is required');
    // Check if email is already in use
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) throw new Error('Email already in use');
    // Hash the password before saving
    const hashedPassword = await hashPassword(user.password);
    // Create the user with the hashed password
    const userToCreate = { ...user, password: hashedPassword };
    const createdUser = await this.userRepository.create(userToCreate);
    if (!createdUser) throw new Error('Failed to create user');
    // Remove password from the returned user object for security reasons
    delete createdUser.password;
    return createdUser;
  }

  async createAndAssign(data: {
    name: string;
    email: string;
    password: string;
    document: string;
    roleId: string;
    classId?: string;
  }): Promise<IUser> {
    // Password validation (redundancy)
    if (!data.password) throw new Error('Password is required');
    // Check if email is already in use
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) throw new Error('Email already in use');
    // Hash the password before saving
    const hashedPassword = await hashPassword(data.password);
    // Create the user with the hashed password
    const userToCreate = { ...data, password: hashedPassword };
    let createdUser: IUser;
    const { classId, ...userData } = userToCreate;
    if (classId) {
      createdUser = await this.userRepository.createAndAssign(
        userData,
        classId,
      );
    } else {
      createdUser = await this.userRepository.create(userData);
    }
    if (!createdUser) throw new Error('Failed to create user');
    // Remove password from the returned user object for security reasons
    delete createdUser.password;
    return createdUser;
  }
}
