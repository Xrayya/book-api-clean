import type User from "@domain/entities/User.entity";
import type { IUserRepository } from "@domain/interfaces/repositories/IUser.repository";
import type { ILoginUseCase } from "@domain/interfaces/useCases/ILogin.useCase";
import { AuthenticationException } from "@exceptions/Auth.exception";
import type { ITokenizer } from "@infrastructure/tokenizer/ITokenizer.type";

class LoginUseCaseImpl implements ILoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenizer: ITokenizer,
  ) {}

  async execute(
    email: User["email"],
    password: User["password"],
  ): Promise<User> {
    const user = await this.userRepository.get(email);

    if (user.password !== password) {
      throw new AuthenticationException("Invalid email or password");
    }

    const token = this.tokenizer.encode({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return this.userRepository.update(user.id, {
      token,
    });
  }
}

export default LoginUseCaseImpl;
