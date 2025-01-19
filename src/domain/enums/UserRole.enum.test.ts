import { test, expect, describe } from "bun:test";
import UserRole from "./UserRole.enum";

describe("UserRole Enum", () => {
  test("Should have 2 roles", () => {
    expect(Object.keys(UserRole).length).toBe(2);
  });

  test("Should have all 2 roles with appropriate code", () => {
    expect(UserRole.ADMIN.valueOf()).toBe("admin");
    expect(UserRole.CLIENT.valueOf()).toBe("client");
  });
});
