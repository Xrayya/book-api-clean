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
  ): Promise<Omit<User, "password">> {
    try {
      await this.userRepository.getPasswordByEmail(userEmail);

      throw new AuthenticationException("User already exists");
    } catch (error) {
      if (error instanceof AuthenticationException) {
        throw error;
      }
    }

    const time = new Date();

    const newUser = await this.userRepository.add({
      name: userName,
      email: userEmail,
      password: userPassword,
      role: UserRole.USER,
      createdAt: time,
      updatedAt: time,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  async login(
    userEmail: string,
    userPassword: string,
  ): Promise<{ user: Omit<User, "password">; token: string }> {
    const user = await this.userRepository.getByEmail(userEmail);

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
      updatedAt: user.updatedAt,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  }
}

export default AuthService;
