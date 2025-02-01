import type { User } from "@domain/entities";
import type { IUserRepository } from "@domain/interfaces/repositories";
import type { IUnsuspendUserUseCase } from "@domain/interfaces/useCases";

export class UnsuspendUserUseCaseImpl implements IUnsuspendUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(userId: User["id"]): Promise<User> {
    return this.userRepository.update(userId, { isSuspended: false });
  }
}
