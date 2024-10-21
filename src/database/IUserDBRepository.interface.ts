import type User from "../entities/User.entity";
import type { IDBRepository } from "./IDBRepository.interface";

export interface IUserDBRepository extends IDBRepository<User> {
  getByEmail(email: User["email"]): Promise<User>;
  getPasswordByEmail(email: User["email"]): Promise<User["password"]>;
}
