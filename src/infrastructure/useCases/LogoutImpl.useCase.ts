import type { User } from "@domain/entities";
import type { IUserRepository } from "@domain/interfaces/repositories";
import type { ILogoutUseCase } from "@domain/interfaces/useCases";
import type { ITokenizer } from "@infrastructure/tokenizer/ITokenizer.type";

export class LogoutUseCaseImpl implements ILogoutUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenizer: ITokenizer,
  ) {}

  async execute(token: string): Promise<boolean> {
    const { id } = this.tokenizer.decode(token) as {
      id: User["id"];
      name: User["name"];
      email: User["email"];
      role: User["role"];
    };

    await this.userRepository.update(id, {
      token: null,
    });

    return true;
  }
}
