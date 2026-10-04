import { IMangaRepositoryRead } from "./IMangaRepository";
import { MangaGet } from "./MangaReadDtos/MangaGet";

export class ListAllMangas {
    private mangaReadRepository: IMangaRepositoryRead;
    
    constructor(mangaReadRepository: IMangaRepositoryRead) {
        this.mangaReadRepository = mangaReadRepository;
    }
   
    async execute(): Promise<MangaGet[]> {
        return this.mangaReadRepository.getAll();
    }
}