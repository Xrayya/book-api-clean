import User from "../entities/User.entity";
import type { IDBRepository } from "../interfaces/IDBRepository.interface";
import type { IRepository } from "../interfaces/IRepository.interface";

class UserRepository implements IRepository<User> {
  constructor(private userDBRepository: IDBRepository<User>) {}

  async get(
    userId: number,
    omit?: (keyof User)[] | undefined,
  ): Promise<User | Omit<User, keyof User>> {
    return this.userDBRepository.get(userId, omit);
  }

  async getAll(
    omit?: (keyof User)[] | undefined,
  ): Promise<User[] | Omit<User, keyof User>[]> {
    return this.userDBRepository.getAll(omit);
  }

  async getByEmail(
    email: string,
    omit?: (keyof User)[] | undefined,
  ): Promise<User | Omit<User, keyof User>> {
    return (await this.userDBRepository.getByField("email", email, omit))[0];
  }

  async add(user: Omit<User, "id">): Promise<User> {
    return this.userDBRepository.add(user);
  }

  async update(userId: number, userData: Omit<User, "id">): Promise<User> {
    return this.userDBRepository.update(userId, userData);
  }

  async delete(userId: number): Promise<User> {
    return this.userDBRepository.delete(userId, true);
  }
}

export default UserRepository;
