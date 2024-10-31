import type User from "../entities/User.entity";
import type { ITokenizer } from "../tokenizer/ITokenizer.interface";

class TokenService {
  constructor(private tokernizer: ITokenizer) { }

  generateUserToken(userData: Omit<User, "password" | "role">): string {
    return this.tokernizer.encode(userData);
  }

  verifyUserToken(token: string): Omit<User, "password" | "role"> {
    return this.tokernizer.decode(token) as Omit<User, "password" | "role">;
  }
}

export default TokenService;
