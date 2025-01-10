import type User from "@domain/entities/User.entity";
import type { IUserRepository } from "@domain/interfaces/repositories/IUser.repository";
import type { ILoginUseCase } from "@domain/interfaces/useCases/ILogin.useCase";
import { AuthenticationException } from "@exceptions/Authentication.exception";

class LoginUseCaseImpl implements ILoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    email: User["email"],
    password: User["password"],
  ): Promise<User> {
    const user = await this.userRepository.get(email);

    if (user.password !== password) {
      throw new AuthenticationException("Invalid email or password");
    }

    return user;
  }
}

export default LoginUseCaseImpl;
