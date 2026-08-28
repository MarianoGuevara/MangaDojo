import { IMangaRepository } from "./IMangaRepository";
import { Manga } from "../../Entities/Manga";
import { IMapper } from "../Interfaces/IMapper";
import { Author } from "../../Entities/Author";

export interface InsertOneMangaRequestDto {
    title: string;
    description: string;
    authorId : number;
    startDate: Date;
    endDate: Date | null;
    totalVolumes: number;
    totalRating: number;
}

export interface InsertOneMangaResponseDto {
    id: number;
}

export class InsertOneMangaUseCase {
    private mangaRepository: IMangaRepository;
    // private authorRepository: AuthorRepository;

    constructor(mangaRepository: IMangaRepository) {
        this.mangaRepository = mangaRepository;
        
    }

    async execute(mangaDto: InsertOneMangaRequestDto): Promise<InsertOneMangaResponseDto> {

        // verificar que el autor exista con repo inyectado
        

        // const manga = new Manga(
        //     mangaDto.title,
        //     mangaDto.description,
        //     mangaDto.author,//
        //     mangaDto.startDate,
        //     mangaDto.endDate,
        //     mangaDto.totalVolumes,
        //     mangaDto.totalRating,
        // )

        // const savedManga = await this.mangaRepository.insertOne(manga);

        // return {
        //     id: savedManga.id
        // };

        return {id : -1}; 
    }
}