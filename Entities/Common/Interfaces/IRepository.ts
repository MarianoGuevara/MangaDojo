export interface IRepository<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T>;
}