import {
  AuthService,
  BookService,
  BorrowingService,
  UserService,
} from "@app/services";
import {
  BookRepositoryImpl,
  BorrowingRepositoryImpl,
  UserRepositoryImpl,
} from "@infrastructure/data/repositories";
import { JWTTokenizer } from "@infrastructure/tokenizer/jwt.tokenizer";

const userRepository = new UserRepositoryImpl();
const bookRepository = new BookRepositoryImpl();
const borrowingRepository = new BorrowingRepositoryImpl();

export const tokenizer = new JWTTokenizer();

export const authService = new AuthService(userRepository, tokenizer);
export const bookService = new BookService(bookRepository);
export const borrowingService = new BorrowingService(borrowingRepository);
export const userService = new UserService(userRepository);
