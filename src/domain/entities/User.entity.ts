import type { UserRole } from "@domain/enums";
import type { IEntity } from "../interfaces/IEntity.type";

export class User implements IEntity {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public role: UserRole,
    public token: string | null,
    public isSuspended: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
