import type User from "@domain/entities/User.entity";

export interface IUnsuspendUserUseCase {
  execute(userId: User["id"]): Promise<User>;
}
