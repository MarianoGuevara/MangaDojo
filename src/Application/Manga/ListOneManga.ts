import { IMangaRepository } from "./IMangaRepository";
import { Manga } from "../../Entities/Manga";
import { ValidationException } from "../../Entities/Exceptions/ValidationException";

export class ListOneManga {
    private mangaRepository: IMangaRepository;
    
    constructor(mangaRepository: IMangaRepository) {
        this.mangaRepository = mangaRepository;
    }
    
    async execute(id: number): Promise<Manga> {
        throw new ValidationException("GetByIdMangaUseCase is not implemented yet");
    }
}