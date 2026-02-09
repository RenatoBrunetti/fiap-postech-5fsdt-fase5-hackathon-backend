import { IUser } from '../entities/models/user.interface.js';
import { IUserRepository } from '../repositories/user.repository.interface.js';

export class UserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async findAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async createUser(user: IUser): Promise<IUser> {
    return this.userRepository.create(user);
  }
}
