import { IRepository } from "../../Entities/Common/Interfaces/IRepository";
import { Manga } from "../../Entities/Manga";

export class GetAllMangaUseCase {
    private mangaRepository: IRepository<Manga>;
    
    constructor(mangaRepository: IRepository<Manga>) {
        this.mangaRepository = mangaRepository;
    }
   
    async execute(): Promise<Manga[]> {
        // 
        const mangas = await this.mangaRepository.getAll();
        return mangas; 
    }
}