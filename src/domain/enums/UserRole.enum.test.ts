import {test, expect} from "bun:test";
import UserRole from "./UserRole.enum";

test("UserRole enum should have 2 roles", () => {
  expect(Object.keys(UserRole).length).toBe(2);
});

test("UserRole enum should have all 2 roles with appropriate code", () => {
  expect(UserRole.ADMIN.valueOf()).toBe("admin");
  expect(UserRole.CLIENT.valueOf()).toBe("client");
});
