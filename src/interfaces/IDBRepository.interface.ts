export interface IDBRepository<T> {
  get(id: number, omit?: Array<keyof T>): Promise<T | Omit<T, keyof T>>;
  getByField(column: keyof T, value: T[keyof T], omit?: Array<keyof T>): Promise<T[] | Omit<T, keyof T>[]>;
  add(item: Omit<T, "id">): Promise<T>;
  update(id: number, item: Omit<T, "id">): Promise<T>;
  delete(id: number, cascade?: boolean): Promise<T>;
  getAll(omit?: Array<keyof T>): Promise<T[] | Omit<T, keyof T>[]>;
}
