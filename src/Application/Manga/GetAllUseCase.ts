import { IMangaRepository } from "./IMangaRepository";
import { Manga } from "../../Entities/Manga";

export class GetAllMangaUseCase<T> {
    private mangaRepository: IMangaRepository<T>;
    
    constructor(mangaRepository: IMangaRepository<T>) {
        this.mangaRepository = mangaRepository;
    }
   
    async execute(): Promise<T[]> {
        const mangas = await this.mangaRepository.getAll();
        return mangas; 
    }
}