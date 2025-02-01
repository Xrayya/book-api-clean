import type { User } from "@domain/entities";

export interface IUnsuspendUserUseCase {
  execute(userId: User["id"]): Promise<User>;
}
