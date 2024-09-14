import type { IEntity } from "./IEntity.interface";

export interface IRepository<T extends IEntity> {
  get(id: number, omit?: Array<keyof T>): Promise<T | Omit<T, keyof T>>;
  add(item: Omit<T, "id">): Promise<T>;
  update(id: T["id"], item: Omit<T, "id">): Promise<T>;
  delete(id: T["id"]): Promise<T>;
  getAll(omit?: Array<keyof T>): Promise<T[] | Omit<T, keyof T>[]>;
}
