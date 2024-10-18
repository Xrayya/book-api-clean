import type User from "../entities/User.entity";
import UserRole from "../enums/UserRole.enum";
import { AuthenticationException } from "../exceptions/Authentication.exception";
import type UserRepository from "../repositories/User.repository";
import type TokenService from "./Token.service";

class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
  ) { }

  async register(
    userName: string,
    userEmail: string,
    userPassword: string,
  ): Promise<User> {
    const user = (await this.userRepository.getByEmail(userEmail, [
      "role",
      "password",
    ])) as Omit<User, "role" | "password">;

    if (user) {
      throw new AuthenticationException("User already exists");
    }

    const time = new Date();

    return this.userRepository.add({
      name: userName,
      email: userEmail,
      password: userPassword,
      role: UserRole.USER,
      createdAt: time,
      updatedAt: time,
    });
  }

  async login(
    userEmail: string,
    userPassword: string,
  ): Promise<{ user: User; token: string }> {
    const user = (await this.userRepository.getByEmail(userEmail)) as User;

    if (!user) {
      throw new AuthenticationException("Invalid login credential");
    }

    if (user.password !== userPassword) {
      throw new AuthenticationException("Invalid login credential");
    }

    const token = this.tokenService.generateUserToken({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt : user.updatedAt,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthService;
