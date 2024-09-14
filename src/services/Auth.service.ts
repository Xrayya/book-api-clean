import User from "../entities/User.entity";
import UserRole from "../enums/UserRole.enum";
import { AuthenticationException } from "../exceptions/Authentication.exception";
import UserRepository from "../repositories/User.repository";

class AuthService {
  constructor(private userRepository: UserRepository) { }

  async register(name: string, email: string, password: string): Promise<User> {
    const user = (await this.userRepository.getByEmail(email)) as User;

    if (user) {
      throw new AuthenticationException("User already exists");
    }

    return this.userRepository.add({
      name,
      email,
      password,
      role: UserRole.USER,
    });
  }

  async login(email: string, password: string): Promise<User> {
    const user = (await this.userRepository.getByEmail(email)) as User;

    if (user.password !== password) {
      throw new AuthenticationException("Invalid login credential");
    }

    return user;
  }
}

export default AuthService;
