import { Manga } from "../../../Entities/Manga";
import { MySqlMangaRow } from "./Dtos/MySqlMangaRow";
import { MySqlManga } from "./Dtos/MySqlManga";
import { MangaGet } from "../../../Application/Manga/MangaReadDtos/MangaGet";
import { MySqlMangaTitleRow } from "./Dtos/MySqlMangaTitleRow";
import { MangaTitleGet } from "../../../Application/Manga/MangaReadDtos/MangaTitleGet";
import { Genre } from "../../../Entities/Enums/Genre";

export class MangaMapper{
    toReadDtoFromRow(manga: MySqlMangaRow): MangaGet {
        return new MangaGet(
            manga.id,
            manga.title,
            manga.description,
            manga.start_date,
            manga.end_date,
            manga.author_name,
            manga.author_surname,
            manga.cover,
            manga.demographic,
            manga.total_volumes,
            manga.genres.split(',') as Genre[]
        );
    }

    toTitleReadDtoFromRow(manga: MySqlMangaTitleRow): MangaTitleGet {
        return new MangaTitleGet(manga.id, manga.title);
    }

    toMySqlMangaFromEntity(manga: Manga): MySqlManga {
        return new MySqlManga(
            manga.Id,
            manga.Title,
            manga.Description,
            manga.StartDate,
            manga.EndDate,
            manga.TotalVolumes,
            0,
            manga.AuthorId
        );
    }
}