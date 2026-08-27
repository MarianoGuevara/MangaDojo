import { IMangaRepository } from "./IMangaRepository";

export interface GetAllMangaResponseDto {
    title: string;
    description: string;
    author: string;
    startDate: Date;
    endDate: Date;
}

export class GetAllMangaUseCase {
    private mangaRepository: IMangaRepository;
    
    constructor(mangaRepository: IMangaRepository) {
        this.mangaRepository = mangaRepository;
    }
   
    async execute(): Promise<GetAllMangaResponseDto[]> {
        const mangas = await this.mangaRepository.getAll();

        const responseDtos = mangas.map(manga => ({
            title: manga.title,
            description: manga.description,
            author: manga.author,
            startDate: manga.startDate,
            endDate: manga.endDate
        }) as GetAllMangaResponseDto);

        return responseDtos;
    }
}