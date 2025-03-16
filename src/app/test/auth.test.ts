import backendApp from "@app/app";
import { JWTTokenizer } from "@infrastructure/tokenizer/jwt.tokenizer";
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
    } catch (error) {}
  });

  afterAll(async () => {
    try {
      await prisma.user.delete({
        where: { email: "uniquetestemailuser209384091903810923@example.com" },
      });
    } catch (error) {}
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

    const resJson = await res.json();

    expect(res.status).toBe(201);
    expect(resJson).toHaveProperty("user");
    expect(resJson.user).toBeObject();
    expect(resJson.user).toHaveProperty("id");
    expect(resJson.user.id).toBeInteger();
    expect(resJson.user).toHaveProperty("email");
    expect(resJson.user.email).toBe(
      "uniquetestemailuser209384091903810923@example.com",
    );
    expect(resJson.user).toHaveProperty("name");
    expect(resJson.user.name).toBe("uniquetest");
    expect(resJson.user).toHaveProperty("role");
    expect(resJson.user.role).toBe("CLIENT");
    expect(resJson.user).toHaveProperty("token");
    expect(resJson.user.token).toBe(null);
    expect(resJson.user).toHaveProperty("isSuspended");
    expect(resJson.user.isSuspended).toBe(false);
    expect(resJson.user).toHaveProperty("createdAt");
    expect(Date.parse(resJson.user.createdAt)).not.toBeNaN();
    expect(resJson.user).toHaveProperty("updatedAt");
    expect(Date.parse(resJson.user.updatedAt)).not.toBeNaN();
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

    const resJson = await res.json();

    expect(res.status).toBe(200);
    expect(resJson).toHaveProperty("user");
    expect(resJson.user).toBeObject();
    expect(resJson.user).toHaveProperty("id");
    expect(resJson.user.id).toBeInteger();
    expect(resJson.user).toHaveProperty("email");
    expect(resJson.user.email).toBe(
      "uniquetestemailuser209384091903810923@example.com",
    );
    expect(resJson.user).toHaveProperty("name");
    expect(resJson.user.name).toBe("uniquetest");
    expect(resJson.user).toHaveProperty("role");
    expect(resJson.user.role).toBe("CLIENT");
    expect(resJson.user).toHaveProperty("isSuspended");
    expect(resJson.user.isSuspended).toBe(false);
    expect(resJson).toHaveProperty("token");
    expect(resJson.token).toBeString();

    const expectedToken = new JWTTokenizer().encode({
      id: resJson.user.id,
      name: resJson.user.name,
      email: resJson.user.email,
      role: resJson.user.role,
    });

    expect(resJson.token).toBe(expectedToken);

    validToken = resJson.token;
  });

  test("should return true when logout with correct token", async () => {
    const res = await backendApp.request("/api/auth/logout", {
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
    });

    const resJson = await res.json();

    expect(res.status).toBe(200);
    expect(resJson).toHaveProperty("isLoggedOut");
    expect(resJson.isLoggedOut).toBe(true);
  });
});
