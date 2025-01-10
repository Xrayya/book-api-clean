import type { IEntity } from "../IEntity.type";

export interface IRepository<T extends IEntity> {
  get(id: T["id"]): Promise<T>;
  add(item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  update(
    id: T["id"],
    item: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>,
  ): Promise<T>;
  delete(id: T["id"]): Promise<T>;
  getAll(): Promise<T[]>;
}
