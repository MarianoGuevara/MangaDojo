import { IMangaRepositoryWrite, IMangaRepositoryRead } from "./IMangaRepository";
import { IAuthorRepository } from "../Author/IAuthorRepository";
import { Manga } from "../../Entities/Manga";
import { Volume } from "../../Entities/Volume";
import { Genre } from "../../Entities/Enums/Genre";
import { Demographic } from "../../Entities/Enums/Demographic";
import { NotFoundException } from "../../Entities/Exceptions/NotFoundException";
import { DuplicateException } from "../../Entities/Exceptions/DuplicateException";

export interface UploadOneMangaInputDTO {
    title: string;
    description: string;
    authorId: number;
    startDate: Date;
    endDate: Date | null;
    cover: string;
    demographic: Demographic;
    volumes: Volume[];
    genres: Genre[];
    totalVolumes: number;
}

export interface UploadOneMangaOutputDTO {
    id: number;
}

export class UploadOneManga {
    private mangaReadRepository: IMangaRepositoryRead;
    private mangaWriteRepository: IMangaRepositoryWrite;
    private authorRepository: IAuthorRepository;

    constructor(mangaReadRepository: IMangaRepositoryRead, mangaWriteRepository: IMangaRepositoryWrite, authorRepository: IAuthorRepository) {
        this.mangaReadRepository = mangaReadRepository;
        this.mangaWriteRepository = mangaWriteRepository;
        this.authorRepository = authorRepository;
    }

    async execute(mangaDto: UploadOneMangaInputDTO): Promise<UploadOneMangaOutputDTO> {
        const manga = await this.mangaReadRepository.getByTitle(mangaDto.title);
        if (manga != null) { throw new DuplicateException("The manga already exists"); }
        
        const author = await this.authorRepository.getById(mangaDto.authorId);
        if (author == null) { throw new NotFoundException("The author does not exist"); }

        const mangaNew = new Manga(
            0,
            mangaDto.title,
            mangaDto.description,
            mangaDto.startDate,
            mangaDto.endDate,
            mangaDto.authorId,
            mangaDto.cover,
            mangaDto.demographic,
            mangaDto.volumes,
            mangaDto.genres,
            mangaDto.totalVolumes,
        )
        
        const savedManga = await this.mangaWriteRepository.insertOne(mangaNew);

        return {
            id: savedManga.Id
        };
    }
}