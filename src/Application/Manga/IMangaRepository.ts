import { Manga } from "../../Entities/Manga";
import { MangaGet } from "./MangaReadDtos/MangaGet";

export interface IMangaRepositoryRead {
    getAll(): Promise<MangaGet[]>;
    getByTitle(title: string): Promise<MangaGet | null>;
}

export interface IMangaRepositoryWrite {
    insertOne(manga: Manga): Promise<Manga>;
}