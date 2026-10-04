import { Manga } from "../../Entities/Manga";
import { MangaGet } from "./MangaReadDtos/MangaGet";
import { MangaTitleGet } from "./MangaReadDtos/MangaTitleGet";

export interface IMangaRepositoryRead {
    getAll(): Promise<MangaGet[]>;
    getByTitle(title: string): Promise<MangaTitleGet | null>;
}

export interface IMangaRepositoryWrite {
    insertOne(manga: Manga): Promise<Manga>;
}