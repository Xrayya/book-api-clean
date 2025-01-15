import type User from "@domain/entities/User.entity";
import type { IUserRepository } from "@domain/interfaces/repositories/IUser.repository";
import SuspendUserUseCaseImpl from "@domain/useCases/SuspendUserImpl.useCase";
import UnsuspendUserUseCaseImpl from "@domain/useCases/UnsuspendUserImpl.useCase";

class AdminService {
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

export default AdminService;
