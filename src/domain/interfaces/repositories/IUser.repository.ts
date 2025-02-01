import type { User } from "@domain/entities";
import type { IRepository } from "./IRepository.type";

export interface IUserRepository extends IRepository<User> {
  get(id: User["id"]): Promise<User>;
  get(email: User["email"]): Promise<User>;

  getPasswordByEmail(email: User["email"]): Promise<User["password"]>;
}
