import type { User } from "@domain/entities";
import type { IUserRepository } from "@domain/interfaces/repositories";
import type { ITokenizer } from "@infrastructure/tokenizer/ITokenizer.type";
import {
  LoginUseCaseImpl,
  LogoutUseCaseImpl,
  RegisterUseCaseImpl,
} from "@infrastructure/useCases";

export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private tokenizer: ITokenizer,
  ) {
    this.registerUseCase = new RegisterUseCaseImpl(this.userRepository);
    this.loginUseCase = new LoginUseCaseImpl(
      this.userRepository,
      this.tokenizer,
    );
    this.logoutUseCase = new LogoutUseCaseImpl(
      this.userRepository,
      this.tokenizer,
    );
  }

  private registerUseCase: RegisterUseCaseImpl;
  private loginUseCase: LoginUseCaseImpl;
  private logoutUseCase: LogoutUseCaseImpl;

  async register(
    userName: string,
    email: string,
    password: string,
  ): Promise<Omit<User, "password">> {
    const { password: _pw, ...rest } = await this.registerUseCase.execute(
      userName,
      email,
      password,
    );

    return rest;
  }

  async login(
    userEmail: string,
    userPassword: string,
  ): Promise<{
    user: Omit<User, "password" | "token" | "createdAt" | "updatedAt">;
    token: string;
  }> {
    const {
      password: _pw,
      token,
      createdAt: _ca,
      updatedAt: _ua,
      ...rest
    } = await this.loginUseCase.execute(userEmail, userPassword);

    return {
      user: rest,
      token: token === null ? "" : token,
    };
  }

  async logout(token: string): Promise<boolean> {
    return this.logoutUseCase.execute(token);
  }
}
