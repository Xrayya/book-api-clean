import type { IEntity } from "../entities/IEntity.interface";

export interface IDBRepository<T extends IEntity> {
  get(id: T["id"]): Promise<T>;
  add(item: Omit<T, "id">): Promise<T>;
  update(id: T["id"], item: Omit<T, "id">): Promise<T>;
  delete(id: T["id"], cascade?: boolean): Promise<T>;
  getAll(): Promise<T[]>;
}

