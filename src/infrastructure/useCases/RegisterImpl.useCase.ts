import type { User } from "@domain/entities";
import { UserRole } from "@domain/enums";
import type { IUserRepository } from "@domain/interfaces/repositories";
import type { IRegisterUseCase } from "@domain/interfaces/useCases";

export class RegisterUseCaseImpl implements IRegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

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
      isSuspended: false,
      token: null,
    });
  }
}
