import { IMangaRepository } from "./IMangaRepository";
import { Manga } from "../../Entities/Manga";
import { IMapper } from "../Interfaces/IMapper";

export interface InsertOneMangaRequestDto {
    title: string;
    description: string;
    author: string;
    startDate: Date;
    endDate: Date | null;
}

export interface InsertOneMangaResponseDto {
    id: number;
}

export class InsertOneMangaUseCase {
    private mangaRepository: IMangaRepository;
  

    constructor(mangaRepository: IMangaRepository) {
        this.mangaRepository = mangaRepository;
    }

    async execute(mangaDto: InsertOneMangaRequestDto): Promise<InsertOneMangaResponseDto> {

        const manga = new Manga(
            mangaDto.title,
            mangaDto.description,
            mangaDto.author,
            mangaDto.startDate,
            mangaDto.endDate,
        )

        const savedManga = await this.mangaRepository.insertOne(manga);

        return {
            id: savedManga.id
        };
    }
}