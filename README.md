# Simple Book API with Clean Architecture

A simple API for managing book data, built with [Hono](https://hono.dev) and organized using Clean Architecture principles.

## Features

- Register
- Login
- Logout
- Get Book List
- Get Single Book
- Borrow Books
- Search Book (and filtering)
- Cofirm Book Return (admin only)
- Suspend User (admin only)
- Unsuspend User (admin only)

## Tech Stack

- **[Hono](https://hono.dev)**:Web application framework. Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.
- **[TypeScript](https://www.typescriptlang.org)**: Typed JavaScript at Any Scale. The main language used in this project.
- **[PostgreSQL](https://www.postgresql.org)**: The World's Most Advanced Open Source Relational Database
- **[Prisma](https://www.prisma.io)**: ORM for interaction with databases
- **[JWT](https://www.npmjs.com/package/jsonwebtoken)**: JSON Web Token for authentication
- **[Zod](https://zod.dev)**: TypeScript-first schema declaration and validation library
- **[Bun](https://bun.sh)**: A fast Javascript all-in-one toolkit
- **Clean Architecture**: Struktur arsitektur untuk menjaga modularitas dan keterpisahan logika

## Project Structure

```
design/                     # Contains designs or diagrams related to the system architecture, currently stored in plantuml format
src/                        # Main directory for application source code.
├── app/                    # Application entry point and main configuration, such as server setup or routing.
│   ├── bootstrap/          # Initialization scripts and setup for the application, such as dependency injection or configuration loading.
│   ├── middlewares/        # Custom middleware for handling requests, responses, and other application logic layers.
│   ├── routes/             # Route definitions for the application's endpoints.
│   ├── schemas/            # Validation schemas for incoming requests, mainly using Zod
│   ├── services/           # Service layer for managing reusable application logic or third-party integrations.
│   └── app.ts              # Main application file, responsible for bootstrapping and running the server.
├── domain/                 # Domain layer for core business logic and abstractions.
│   ├── entities/           # Definitions of domain entities representing core objects in the system.
│   ├── enum/               # Enums used for constants or fixed categories within the domain.
│   ├── interfaces/         # Definitions of contracts for various components in the system.
│   │   ├── repositories/   # Contracts for repository implementations within the domain.
│   │   └── useCases/       # Contracts for use case implementations within the domain.
│   └── useCases/           # Implementations of use cases governing the primary application logic.
├── exceptions/             # Definitions of custom exceptions for handling specific errors.
├── infrastructure/         # Infrastructure layer for specific technical implementations.
│   ├── data/               # Infrastructure-related data such as ORM, database configurations, or storage services.
│   │   └── repositories/   # Repository implementations connecting the domain to data storage.
│   ├── tokenizer/          # Modules related to tokenization, such as JWT authentication or token generation.
│   └── useCases/           # Technical implementations of use cases with infrastructure dependencies.
├── utils/                  # Utility functions or modules that are reusable
└── index.ts                # The main entry point of the application, responsible for initializing and starting the server or application process.
```

## Installation

1. **Clone this repository**

    ```bash
    git clone https://github.com/Xrayya/book-api-clean
    cd book-api-clean
    ```

2. **Install dependencies**

    ```bash
    bun install
    ```

    This project built using [Bun](https://bun.sh) as a toolkit. If you use npm or yarn, you can run `npm install` or `yarn install` instead. You might also want to adjust some packages and scripts in the `package.json` file.

3. **Set up the environment variables**

    Copy the `.env.example` file to `.env` and adjust the values according to your local environment.

    And since this project uses PostgreSQL, make sure you have a PostgreSQL database running. You can use Docker to run a PostgreSQL container:

    ```bash
    docker run --name book-api-postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres
    ```

    If you want to use a different database, you can adjust the database configuration in the `.env` file and also generator in [`/prisma/prisma.schema`](https://github.com/Xrayya/book-api-clean/blob/main/prisma/schema.prisma).

4. **Run the database migration**

    This project uses Prisma as an ORM for database interaction. You can run the migration to create the database schema:

    ```bash
    bunx prisma migrate dev
    ```

    This command will create the database schema based on the Prisma schema file in the `prisma` directory.

5. **Run the application**

    You can start the application by running:

    ```bash
    bun dev
    ```

    This command will start the application in development mode. You can access the API at `http://localhost:3000/api`.

## Future Improvements

- [ ] Add more unit tests and integration tests
- [ ] Add API documentation
- [ ] Add more features such as user profile, book rating, etc.
