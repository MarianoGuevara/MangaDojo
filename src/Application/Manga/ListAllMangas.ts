import { IMangaRepository } from "./IMangaRepository";

export interface ListAllMagasOutputDTO {
    title: string;
    description: string;
    author: string;
    startDate: Date;
    endDate: Date | null;
    totalVolumes: number;
    totalRating: number; 
}

export class ListAllMangas {
    private mangaRepository: IMangaRepository;
    
    constructor(mangaRepository: IMangaRepository) {
        this.mangaRepository = mangaRepository;
    }
   
    async execute(): Promise<ListAllMagasOutputDTO[]> {
        // validar token de usuario

        const mangas = await this.mangaRepository.getAll();

        const responseDtos = mangas.map(manga => ({
            title: manga.Title,
            description: manga.Description,
            author: manga.Author.Name + " " + manga.Author.Surname,
            startDate: manga.StartDate,
            endDate: manga.EndDate,
            totalVolumes: manga.TotalVolumes,
            totalRating: manga.TotalRating,
        }) as ListAllMagasOutputDTO);

        return responseDtos;
    }
}