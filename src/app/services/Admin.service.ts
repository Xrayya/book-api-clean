import type User from "@domain/entities/User.entity";
import type { IUserRepository } from "@domain/interfaces/repositories/IUser.repository";
import SuspendUserUseCaseImpl from "@domain/useCases/SuspendUserImpl.useCase";

class AdminService {
  constructor(private userRepository: IUserRepository) {
    this.suspendUserUseCase = new SuspendUserUseCaseImpl(this.userRepository);
  }

  private suspendUserUseCase: SuspendUserUseCaseImpl;

  async suspendUser(id: User["id"]): Promise<User> {
    return this.suspendUserUseCase.execute(id);
  }
}

export default AdminService;
