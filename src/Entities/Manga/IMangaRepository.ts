export interface IMangaRepository<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T | null>;
}