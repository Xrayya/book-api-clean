import type User from "@domain/entities/User.entity";

export interface ILogoutUseCase {
  execute(userId: User["id"], token: string): Promise<boolean>;
}
