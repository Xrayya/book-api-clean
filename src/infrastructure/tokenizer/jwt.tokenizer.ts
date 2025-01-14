import jwt from "jsonwebtoken";
import type { ITokenizer } from "./ITokenizer.type";

class JWTTokenizer implements ITokenizer {
  encode(data: string | Buffer | object): string {
    return jwt.sign(data, process.env.JWT_SECRET!);
  }

  decode(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}

export default JWTTokenizer;
