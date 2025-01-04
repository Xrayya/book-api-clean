import type User from "@domain/entities/User.entity";

export interface IRegisterUseCase {
  execute(
    name: User["name"],
    email: User["email"],
    password: User["password"],
  ): Promise<User>;
}
