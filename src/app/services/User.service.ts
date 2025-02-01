import type { User } from "@domain/entities";
import type { IUserRepository } from "@domain/interfaces/repositories";
import {
  SuspendUserUseCaseImpl,
  UnsuspendUserUseCaseImpl,
} from "@domain/useCases";

export class UserService {
  constructor(private userRepository: IUserRepository) {
    this.suspendUserUseCase = new SuspendUserUseCaseImpl(this.userRepository);
    this.unsuspendUserUseCase = new UnsuspendUserUseCaseImpl(
      this.userRepository,
    );
  }

  private suspendUserUseCase: SuspendUserUseCaseImpl;
  private unsuspendUserUseCase: UnsuspendUserUseCaseImpl;

  async suspendUser(id: User["id"]): Promise<User> {
    return this.suspendUserUseCase.execute(id);
  }

  async unsuspendUser(id: User["id"]): Promise<User> {
    return this.unsuspendUserUseCase.execute(id);
  }
}
