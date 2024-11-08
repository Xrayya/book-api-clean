import type { IEntity } from "../entities/IEntity.interface";

export interface IRepository<T extends IEntity> {
  get(id: number): Promise<T>;
  add(item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  update(id: T["id"], item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  delete(id: T["id"]): Promise<T>;
  getAll(): Promise<T[]>;
}
