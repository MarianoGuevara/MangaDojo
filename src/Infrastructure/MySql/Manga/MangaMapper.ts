import { Manga } from "../../../Entities/Manga";
import { MySqlMangaRow } from "./Dtos/MySqlMangaRow";
import { MySqlManga } from "./Dtos/MySqlManga";
import { MangaGet } from "../../../Application/Manga/MangaReadDtos/MangaGet";
import { Genre } from "../../../Entities/Enums/Genre";

export class MangaMapper{
    toReadDtoFromRow(manga: MySqlMangaRow): MangaGet {
        return new MangaGet(
            manga.id,
            manga.title,
            manga.description,
            manga.start_date,
            manga.end_date,
            manga.author_fullname,
            manga.cover,
            manga.demographic,
            manga.total_volumes,
            manga.genres.split(',') as Genre[]
        );
    }

    toMySqlMangaFromEntity(manga: Manga): MySqlManga {
        let mySqlManga = {
            id: manga.Id,
            title: manga.Title,
            description: manga.Description,
            start_date: manga.StartDate,
            end_date: manga.EndDate,
            total_volumes: manga.TotalVolumes,
            total_rating: 0,
            mangas_id_author: manga.AuthorId     
        } as MySqlManga;
        return mySqlManga;
    }
}