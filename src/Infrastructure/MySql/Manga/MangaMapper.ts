import { Manga } from "../../../Entities/Manga";
import { Author } from "../../../Entities/Author";
import { MySqlMangaWithAuthor } from "./Dtos/MySqlMangaWithAuthor";
import { MySqlManga } from "./Dtos/MySqlManga";

export class MangaMapper{
    toEntityFromMangaWithAuthor(manga: MySqlMangaWithAuthor): Manga {
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

    toMangaFromEntity(manga: Manga): MySqlManga {
        return new MySqlManga(
            manga.Id,
            manga.Title,
            manga.Description,
            manga.StartDate,
            manga.EndDate,
            manga.TotalVolumes,
            manga.TotalRating,
            manga.Author.Id
        )
    }
}