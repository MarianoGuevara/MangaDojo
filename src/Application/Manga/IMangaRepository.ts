import { Manga } from "../../Entities/Manga";

export interface IMangaRepository {
    getAll(): Promise<Manga[]>;
    getById(id: number): Promise<Manga>;
    insertOne(manga: Manga): Promise<Manga>;
}