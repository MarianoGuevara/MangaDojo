import { IMangaRepository } from "./IMangaRepository";
import { Manga } from "../../Entities/Manga";
import { Author } from "../../Entities/Author";

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
    // private authorRepository: AuthorRepository;

    constructor(mangaRepository: IMangaRepository) {
        this.mangaRepository = mangaRepository;
        
    }

    async execute(mangaDto: UploadOneMangaInputDTO): Promise<UploadOneMangaOutputDTO> {

        // verificar que el autor exista con repo inyectado
        

        // const manga = new Manga(
        //     mangaDto.title,
        //     mangaDto.description,
        //     mangaDto.author,// llamar de repo autor
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