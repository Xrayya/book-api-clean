import type { User } from "@domain/entities";
import type { IUserRepository } from "@domain/interfaces/repositories";
import type { ISuspendUserUseCase } from "@domain/interfaces/useCases";

export class SuspendUserUseCaseImpl implements ISuspendUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(userId: User["id"]): Promise<User> {
    return this.userRepository.update(userId, { isSuspended: true });
  }
}
