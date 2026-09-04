import { IMangaRepository } from "./IMangaRepository";
import { IAuthorRepository } from "../Author/IAuthorRepository";
import { Manga } from "../../Entities/Manga";
import { Author } from "../../Entities/Author";
import { NotFoundException } from "../../Entities/Exceptions/NotFoundException";
import { DuplicateException } from "../../Entities/Exceptions/DuplicateException";

export interface UploadOneMangaInputDTO {
    title: string;
    description: string;
    authorId : number;
    startDate: Date;
    endDate: Date | null;
    totalVolumes: number;
    totalRating: number;
}

export interface UploadOneMangaOutputDTO {
    id: number;
}

export class UploadOneManga {
    private mangaRepository: IMangaRepository;
    private authorRepository: IAuthorRepository;

    constructor(mangaRepository: IMangaRepository, authorRepository: IAuthorRepository) {
        this.mangaRepository = mangaRepository;
        this.authorRepository = authorRepository;
    }

    async execute(mangaDto: UploadOneMangaInputDTO): Promise<UploadOneMangaOutputDTO> {
        console.log(mangaDto);
        console.log(mangaDto.authorId);
        const manga = await this.mangaRepository.getByName(mangaDto.title);
        if (manga != null) { throw new DuplicateException("The manga already exists"); }
        
        const author = await this.authorRepository.getById(mangaDto.authorId);
        if (author == null) { throw new NotFoundException("The author does not exist"); }

        const mangaNew = new Manga(
            mangaDto.title,
            mangaDto.description,
            author,
            mangaDto.startDate,
            mangaDto.endDate,
            mangaDto.totalVolumes,
            mangaDto.totalRating,
        )
        
        const savedManga = await this.mangaRepository.insertOne(mangaNew);

        return {
            id: savedManga.id
        };
    }
}