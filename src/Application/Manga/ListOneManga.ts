import { IMangaRepositoryRead } from "./IMangaRepository";
import { MangaGet } from "./MangaReadDtos/MangaGet";
import { ValidationException } from "../../Entities/Exceptions/ValidationException";

export interface ListOneMangaInputDTO {
    title: string;
}

export class ListOneManga {
    private mangaReadRepository: IMangaRepositoryRead;
    
    constructor(mangaReadRepository: IMangaRepositoryRead) {
        this.mangaReadRepository = mangaReadRepository;
    }
    
    async execute(input: ListOneMangaInputDTO): Promise<MangaGet> {
        throw new ValidationException("GetByIdMangaUseCase is not implemented yet");
    }
}