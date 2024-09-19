import type User from "../entities/User.entity";
import type UserRepository from "../repositories/User.repository";

class UserService {
  private userRepository: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo;
  }

  async getUserProfile(userId: User["id"]): Promise<User> {
    return this.userRepository.get(userId, ["password"]) as Promise<User>;
  }

  async updateUserProfile(
    userid: User["id"],
    userData: Omit<User, "id">,
  ): Promise<User> {
    return this.userRepository.update(userid, userData);
  }
}

export default UserService;
