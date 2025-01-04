import type User from "@domain/entities/User.entity";

export interface ILoginUseCase {
  execute(email: User["email"], password: User["password"]): Promise<User>;
}
