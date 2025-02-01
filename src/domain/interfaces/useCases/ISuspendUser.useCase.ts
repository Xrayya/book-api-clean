import type { User } from "@domain/entities";

export interface ISuspendUserUseCase {
  execute(userId: User["id"]): Promise<User>;
}
