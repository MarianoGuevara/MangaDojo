import { createContainer, asClass, asValue, InjectionMode } from "awilix";
import { MangaRepository } from "./MySql/Manga/MangaRepository";
import { MangaController } from "../InterfaceAdapter/MangaController";
import { ListAllMangas } from "../Application/Manga/ListAllMangas";
import { UploadOneManga } from "../Application/Manga/UploadOneManga";

import {pool} from "./MySql/MySqlPool";
import { MangaMapper } from "./MySql/Manga/MangaMapper";
import { AuthorController } from "../InterfaceAdapter/AuthorController";
import { AuthorRepository } from "./MySql/Author/AuthorRepository";
import { AuthorMapper } from "./MySql/Author/AuthorMapper";
import { UploadOneAuthor } from "../Application/Author/UploadOneAuthor";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
    pool: asValue(pool),

    mangaController: asClass(MangaController).singleton(),
    authorController: asClass(AuthorController).singleton(),

    mangaRepository: asClass(MangaRepository).singleton(),
    authorRepository: asClass(AuthorRepository).singleton(),

    mangaMapper: asClass(MangaMapper).singleton(),
    authorMapper: asClass(AuthorMapper).singleton(),

    getAllMangasUseCase: asClass(ListAllMangas).singleton(),
	  insertOneMangaUseCase: asClass(UploadOneManga).singleton(),
    uploadOneAuthorUseCase: asClass(UploadOneAuthor).singleton(),
});

export { container };

/*
pasos: 
-configuracion de libreria awilix y container de libreria
-dentro del container, matchear las interfaces con clases reales
-exportarlo para en cualquier lugar poder container.resolve<MangaController>("mangaController");
*/