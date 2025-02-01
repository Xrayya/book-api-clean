import type { User } from "@domain/entities";

export interface IRegisterUseCase {
  execute(
    name: User["name"],
    email: User["email"],
    password: User["password"],
  ): Promise<User>;
}
