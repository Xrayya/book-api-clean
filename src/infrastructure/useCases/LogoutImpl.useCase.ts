import type User from "@domain/entities/User.entity";
import type { IUserRepository } from "@domain/interfaces/repositories/IUser.repository";
import type { ILogoutUseCase } from "@domain/interfaces/useCases/ILogout.useCase";
import type { ITokenizer } from "@infrastructure/tokenizer/ITokenizer.type";

class LogoutUseCaseImpl implements ILogoutUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenizer: ITokenizer,
  ) {}

  async execute(userId: User["id"], token: string): Promise<boolean> {
    const decoded = this.tokenizer.decode(token) as {
      id: User["id"];
      name: User["name"];
      email: User["email"];
      role: User["role"];
    };

    if (decoded.id !== userId) {
      throw new Error("Invalid token");
    }

    await this.userRepository.update(userId, {
      token: null,
    });

    return true;
  }
}

export default LogoutUseCaseImpl;
