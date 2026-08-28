import { Manga } from "../Entities/Manga";
import { IMapper } from "../Application/Interfaces/IMapper";
import { MangaModel } from "./Models/MangaModel";

export class MangaMapper implements IMapper<Manga, MangaModel> {
    map(manga: Manga): MangaModel {
        return new MangaModel(
            manga.id,
            manga.title,
            manga.description,
            manga.startDate,
            manga.endDate,
            manga.totalVolumes,
            manga.totalRating,
            manga.author.id
        );
    }
}