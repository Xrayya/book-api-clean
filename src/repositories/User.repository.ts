import type { IUserDBRepository } from "../database/IUserDBRepository.interface";
import type User from "../entities/User.entity";
import type { IRepository } from "./IRepository.interface";

class UserRepository implements IRepository<User> {
  constructor(private userDBRepository: IUserDBRepository) { }

  async get(userId: number): Promise<User> {
    return this.userDBRepository.get(userId);
  }

  async getAll(): Promise<User[]> {
    return this.userDBRepository.getAll();
  }

  async getByEmail(email: User["email"]): Promise<User> {
    return this.userDBRepository.getByEmail(email);
  }

  async getPasswordByEmail(email: User["email"]): Promise<User["password"]> {
    return this.userDBRepository.getPasswordByEmail(email);
  }

  async add(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    return this.userDBRepository.add(user);
  }

  async update(
    userId: number,
    userData: Omit<User, "id" | "createdAt" | "updatedAt">,
  ): Promise<User> {
    return this.userDBRepository.update(userId, userData);
  }

  async delete(userId: number): Promise<User> {
    return this.userDBRepository.delete(userId, true);
  }
}

export default UserRepository;
