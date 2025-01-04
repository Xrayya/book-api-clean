import type User from "@domain/entities/User.entity";

export interface ISuspendUserUseCase {
  execute(userId: User["id"]): Promise<User>;
}
