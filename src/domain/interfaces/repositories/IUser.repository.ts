import type User from "@domain/entities/User.entity";
import type { IRepository } from "./IRepository.type";

export interface IUserRepository extends IRepository<User> {
  getByEmail(email: User["email"]): Promise<User>;

  getPasswordByEmail(email: User["email"]): Promise<User["password"]>;
}
