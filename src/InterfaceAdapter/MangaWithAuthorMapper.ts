import { Manga } from "../Entities/Manga";
import { IMapper } from "../Application/Interfaces/IMapper";
import { MangaWithAuthorModel } from "./Models/MangaWithAuthorModel";
import { Author } from "../Entities/Author";
import { IMapperDouble } from "../Application/Interfaces/IMapperDouble";

export class MangaWithAuthorMapper implements IMapperDouble<Manga, MangaWithAuthorModel> {
    map(manga: Manga): MangaWithAuthorModel {
        return new MangaWithAuthorModel(
            manga.id,
            manga.title,
            manga.description,
            manga.startDate,
            manga.endDate,
            manga.totalVolumes,
            manga.totalRating,
            manga.author.id,
            manga.author.name,
            manga.author.surname,
            manga.author.nickname
        );
    }

    mapToEntity(dto: MangaWithAuthorModel): Manga {
        const author = new Author(dto.author_name, dto.author_surname, dto.author_nickname, dto.author_id);
        console.log(dto);
        return new Manga(
            dto.title,
            dto.description,
            author,
            dto.start_date,
            dto.end_date,
            dto.total_volumes,
            dto.total_rating,
            dto.id
        );
    }
}