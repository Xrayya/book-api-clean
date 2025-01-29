import backendApp from "@app/app";
import JWTTokenizer from "@infrastructure/tokenizer/jwt.tokenizer";
import { PrismaClient } from "@prisma/client";
import { afterAll, beforeAll, describe, expect, test } from "bun:test";

const prisma = new PrismaClient();

let validToken: string;

describe("Auth routes", () => {
  beforeAll(async () => {
    try {
      await prisma.user.delete({
        where: { email: "uniquetestemailuser209384091903810923@example.com" },
      });
    } catch (error) { }
  });

  afterAll(async () => {
    try {
      await prisma.user.delete({
        where: { email: "uniquetestemailuser209384091903810923@example.com" },
      });
    } catch (error) { }
  });

  test("should return user info correctly when register with correct credentials", async () => {
    const res = await backendApp.request("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "uniquetestemailuser209384091903810923@example.com",
        username: "uniquetest",
        password: "Password01",
      }),
    });

    const userCreated = await res.json();

    expect(res.status).toBe(201);
    expect(userCreated).toHaveProperty("user");
    expect(userCreated.user).toBeObject();
    expect(userCreated.user).toHaveProperty("id");
    expect(userCreated.user.id).toBeInteger();
    expect(userCreated.user).toHaveProperty("email");
    expect(userCreated.user.email).toBe(
      "uniquetestemailuser209384091903810923@example.com",
    );
    expect(userCreated.user).toHaveProperty("name");
    expect(userCreated.user.name).toBe("uniquetest");
    expect(userCreated.user).toHaveProperty("role");
    expect(userCreated.user.role).toBe("client");
    expect(userCreated.user).toHaveProperty("token");
    expect(userCreated.user.token).toBe(null);
    expect(userCreated.user).toHaveProperty("isSuspended");
    expect(userCreated.user.isSuspended).toBe(false);
    expect(userCreated.user).toHaveProperty("createdAt");
    expect(Date.parse(userCreated.user.createdAt)).not.toBeNaN();
    expect(userCreated.user).toHaveProperty("updatedAt");
    expect(Date.parse(userCreated.user.updatedAt)).not.toBeNaN();
  });

  test("should return user info and token correctly when login with correct credentials", async () => {
    const res = await backendApp.request("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "uniquetestemailuser209384091903810923@example.com",
        password: "Password01",
      }),
    });

    const userLoggedIn = await res.json();

    expect(res.status).toBe(200);
    expect(userLoggedIn).toHaveProperty("user");
    expect(userLoggedIn.user).toBeObject();
    expect(userLoggedIn.user).toHaveProperty("id");
    expect(userLoggedIn.user.id).toBeInteger();
    expect(userLoggedIn.user).toHaveProperty("email");
    expect(userLoggedIn.user.email).toBe(
      "uniquetestemailuser209384091903810923@example.com",
    );
    expect(userLoggedIn.user).toHaveProperty("name");
    expect(userLoggedIn.user.name).toBe("uniquetest");
    expect(userLoggedIn.user).toHaveProperty("role");
    expect(userLoggedIn.user.role).toBe("client");
    expect(userLoggedIn.user).toHaveProperty("isSuspended");
    expect(userLoggedIn.user.isSuspended).toBe(false);
    expect(userLoggedIn).toHaveProperty("token");
    expect(userLoggedIn.token).toBeString();

    const expectedToken = new JWTTokenizer().encode({
      id: userLoggedIn.user.id,
      name: userLoggedIn.user.name,
      email: userLoggedIn.user.email,
      role: userLoggedIn.user.role,
    });

    expect(userLoggedIn.token).toBe(expectedToken);

    validToken = userLoggedIn.token;
  });

  test("should return true when logout with correct token", async () => {
    const res = await backendApp.request("/api/auth/logout", {
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
    });

    const loggedOutInfo = await res.json();

    expect(res.status).toBe(200);
    expect(loggedOutInfo).toHaveProperty("isLoggedOut");
    expect(loggedOutInfo.isLoggedOut).toBe(true);
  });
});
