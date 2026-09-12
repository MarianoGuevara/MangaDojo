import { Manga } from "../../Entities/Manga";

export interface IMangaRepository {
    getAll(): Promise<Manga[]>;
    getByTitle(title: string): Promise<Manga | null>;
    insertOne(manga: Manga): Promise<Manga>;
}