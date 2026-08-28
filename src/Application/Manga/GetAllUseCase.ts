import { IMangaRepository } from "./IMangaRepository";

export interface GetAllMangaResponseDto {
    title: string;
    description: string;
    author: string;
    startDate: Date;
    endDate: Date | null;
    totalVolumes: number;
    totalRating: number; 
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
            author: manga.author.name + " " + manga.author.surname,
            startDate: manga.startDate,
            endDate: manga.endDate,
            totalVolumes: manga.totalVolumes,
            totalRating: manga.totalRating,
        }) as GetAllMangaResponseDto);

        return responseDtos;
    }
}