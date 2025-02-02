import { UserRole } from "@domain/enums";
import { describe, expect, test } from "bun:test";
import { User } from "./User.entity";

describe("User Entity", () => {
  test("Initiate user entity return proper user object", () => {
    const dateTest = new Date();
    const user = new User(
      1,
      "User Name",
      "test@example.com",
      "password",
      UserRole.CLIENT,
      "token",
      false,
      dateTest,
      dateTest,
    );

    expect(user).toBeObject();
    expect(user.id).toBe(1);
    expect(user.name).toBe("User Name");
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("password");
    expect(user.role).toBe(UserRole.CLIENT);
    expect(user.token).toBe("token");
    expect(user.isSuspended).toBeFalse();
    expect(user.createdAt).toBe(dateTest);
    expect(user.updatedAt).toBe(dateTest);
  });

  test("Token should be nullable", () => {
    const dateTest = new Date();
    const user = new User(
      1,
      "User Name",
      "test@example.com",
      "password",
      UserRole.CLIENT,
      null,
      false,
      dateTest,
      dateTest,
    );

    expect(user).toBeObject();
    expect(user.id).toBe(1);
    expect(user.name).toBe("User Name");
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("password");
    expect(user.role).toBe(UserRole.CLIENT);
    expect(user.token).toBe(null);
    expect(user.isSuspended).toBeFalse();
    expect(user.createdAt).toBe(dateTest);
    expect(user.updatedAt).toBe(dateTest);
  });
});
