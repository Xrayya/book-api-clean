import type { User } from "@domain/entities";

export interface ILoginUseCase {
  execute(email: User["email"], password: User["password"]): Promise<User>;
}
