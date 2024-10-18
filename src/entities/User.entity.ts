import type UserRole from "../enums/UserRole.enum";
import type { IEntity } from "../interfaces/IEntity.interface";

class User implements IEntity {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public role: UserRole,
    public createdAt: Date,
    public updatedAt: Date,
  ) { }
}

export default User;
