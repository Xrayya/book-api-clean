import type { IEntity } from "../IEntity.type";

export interface IRepository<T extends IEntity> {
  get(id: number): Promise<T>;
  add(item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  update(id: T["id"], item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  delete(id: T["id"]): Promise<T>;
  getAll(): Promise<T[]>;
}
