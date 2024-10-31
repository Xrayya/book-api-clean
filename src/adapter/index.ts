import BookPrismaRepository from "../database/prisma/BookDBRepository.prisma";
import UserPrismaRepository from "../database/prisma/UserDBRepository.prisma";
import BookRepository from "../repositories/Book.repository";
import UserRepository from "../repositories/User.repository";
import AuthService from "../services/Auth.service";
import BookService from "../services/Book.service";
import TokenService from "../services/Token.service";
import UserService from "../services/User.service";
import JWTTokenizer from "../tokenizer/jwt.tokenizer";

export const userRepository = new UserRepository(new UserPrismaRepository());
export const bookRepository = new BookRepository(new BookPrismaRepository());

export const userService = new UserService(userRepository);
export const bookService = new BookService(bookRepository);
export const tokenService = new TokenService(new JWTTokenizer())
export const authService = new AuthService(userRepository, tokenService);
