import { Manga } from "../../../Entities/Manga";
import { Author } from "../../../Entities/Author";
import { MySqlMangaReadRow } from "./Dtos/MySqlMangaReadRow";
import { MySqlMangaInsert } from "./Dtos/MySqlMangaInsert";

export class MangaMapper{
    toMangaFromMangaReadRow(manga: MySqlMangaReadRow): Manga {
        const author = new Author(
            manga.author_name, 
            manga.author_surname, 
            manga.author_nickname, 
            manga.author_id
        );

        return new Manga(
            manga.title,
            manga.description,
            author,
            manga.start_date,
            manga.end_date,
            manga.total_volumes,
            manga.total_rating,
            manga.author_id
        );
    }

    toMangaInsertFromManga(manga: Manga): MySqlMangaInsert {
        return new MySqlMangaInsert(
            manga.id,
            manga.title,
            manga.description,
            manga.startDate,
            manga.endDate,
            manga.totalVolumes,
            manga.totalRating,
            manga.author.id
        )
    }
}