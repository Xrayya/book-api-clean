import type User from "@domain/entities/User.entity";
import type { IUserRepository } from "@domain/interfaces/repositories/IUser.repository";

class UserService {
  private userRepository: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepository = userRepo;
  }

  async getUserProfile(userId: User["id"]): Promise<User> {
    return this.userRepository.get(userId) as Promise<User>;
  }

  async updateUserProfile(
    userid: User["id"],
    userData: Omit<User, "id">,
  ): Promise<User> {
    return this.userRepository.update(userid, userData);
  }
}

export default UserService;
