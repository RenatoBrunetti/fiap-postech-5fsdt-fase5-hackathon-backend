import { IUser } from '../entities/models/user.interface.js';

import { hashPassword } from '../lib/bcrypt/hash-password.js';

import { IUserRepository } from '../repositories/user.repository.interface.js';

export class UserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async findAll(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
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
}
