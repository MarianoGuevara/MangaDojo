import { MangaModel } from "./Models/MangaModel";
import { Manga } from "../Entities/Manga";
import {IMapper} from "../Application/Interfaces/IMapper";

export class MangaMapperModel implements IMapper<Manga, MangaModel> {
    map(manga: Manga): MangaModel {
        return new MangaModel(
            manga.id,
            manga.title,
            manga.author,
            manga.description,
            manga.startDate,
            manga.endDate,
        );
    }

    mapToEntity(dto: MangaModel): Manga {
        return new Manga(
            dto.title,
            dto.author,
            dto.description,
            dto.startDate,
            dto.endDate,
            [],
            dto.id
        );
    }
}