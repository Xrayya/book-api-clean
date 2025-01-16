import type User from "@domain/entities/User.entity";
import type { IUserRepository } from "@domain/interfaces/repositories/IUser.repository";
import type { IUnsuspendUserUseCase } from "@domain/interfaces/useCases/IUnsuspendUser.useCase";

class UnsuspendUserUseCaseImpl implements IUnsuspendUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(userId: User["id"]): Promise<User> {
    return this.userRepository.update(userId, { isSuspended: false });
  }
}

export default UnsuspendUserUseCaseImpl;
