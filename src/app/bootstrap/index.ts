import AuthService from "@app/services/Auth.service";
import BookService from "@app/services/Book.service";
import BorrowingService from "@app/services/Borrowing.service";
import BookRepositoryImpl from "@infrastructure/data/repositories/BookImpl.repository";
import BorrowingRepositoryImpl from "@infrastructure/data/repositories/BorrowingImpl.repository";
import UserRepositoryImpl from "@infrastructure/data/repositories/UserImpl.repository";
import JWTTokenizer from "@infrastructure/tokenizer/jwt.tokenizer";

const userRepository = new UserRepositoryImpl();
const bookRepository = new BookRepositoryImpl();
const borrowingRepository = new BorrowingRepositoryImpl();

const tokenizer = new JWTTokenizer();

export const authService = new AuthService(userRepository, tokenizer);
export const bookService = new BookService(bookRepository);
export const borrowingService = new BorrowingService(
  borrowingRepository,
  tokenizer,
);
