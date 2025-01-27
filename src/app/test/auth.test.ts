import backendApp from "@app/app";
import { PrismaClient } from "@prisma/client";
import { describe, expect, test } from "bun:test";

describe("Auth routes", () => {
  test("should return create user correctly when register with correct credentials", async () => {
    const prisma = new PrismaClient();

    try {
      await prisma.user.delete({
        where: { email: "uniquetestemailuser209384091903810923@example.com" },
      });
    } catch (error) { }

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

    console.log("Created User", userCreated);

    expect(res.status).toBe(201);
    expect(userCreated).toHaveProperty("user");
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

    try {
      await prisma.user.delete({
        where: { email: "uniquetestemailuser209384091903810923@example.com" },
      });
    } catch (error) { }
  });
});
