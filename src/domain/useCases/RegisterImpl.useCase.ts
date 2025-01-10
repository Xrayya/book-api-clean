import type User from "@domain/entities/User.entity";
import UserRole from "@domain/enums/UserRole.enum";
import type { IUserRepository } from "@domain/interfaces/repositories/IUser.repository";
import type { IRegisterUseCase } from "@domain/interfaces/useCases/IRegister.useCase";

class RegisterUseCaseImpl implements IRegisterUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(
    name: User["name"],
    email: User["email"],
    password: User["password"],
  ): Promise<User> {
    return this.userRepository.add({
      email,
      name,
      password,
      role: UserRole.CLIENT,
    });
  }
}

export default RegisterUseCaseImpl;
