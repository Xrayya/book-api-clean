import type User from "@domain/entities/User.entity";
import type { IUserRepository } from "@domain/interfaces/repositories/IUser.repository";
import type { ISuspendUserUseCase } from "@domain/interfaces/useCases/ISuspendUser.useCase";

class SuspendUserUseCaseImpl implements ISuspendUserUseCase {
  constructor(private userRepository: IUserRepository) { }

  execute(userId: User["id"]): Promise<User> {
    return this.userRepository.update(userId, { isSuspended: true });
  }
}

export default SuspendUserUseCaseImpl;
