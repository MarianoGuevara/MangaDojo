import { Manga } from "../../Entities/Manga";

export interface IMangaRepository {
    getAll(): Promise<Manga[]>;
    getById(id: number): Promise<Manga | null>;
    getByName(name: string): Promise<Manga | null>;
    insertOne(manga: Manga): Promise<Manga>;
}