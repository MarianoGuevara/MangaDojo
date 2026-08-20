import { IRepository } from "../../Entities/Manga/IMangaRepository";
import { Manga } from "../../Entities/Manga";
import { ValidationException } from "../../Entities/Common/Exceptions/ValidationException";
import { MangaException } from "../../Entities/Common/Exceptions/MangaException";

export class GetByIdMangaUseCase {
    private mangaRepository: IRepository<Manga>;
    
    constructor(mangaRepository: IRepository<Manga>) {
        this.mangaRepository = mangaRepository;
    }
    
    async execute(id: number): Promise<Manga> {
        if (id <= 0) {
            throw new ValidationException("Id must be greater than 0");
        }

        const manga = await this.mangaRepository.getById(id);

        // !manga -> manga is null or undefined
        if (!manga) {
            throw new MangaException("Manga not found");
        }

        return manga;
    }
}