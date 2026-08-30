import { createContainer, asClass, asValue, InjectionMode } from "awilix";
import { MangaRepository } from "./MySql/Manga/MangaRepository";
import { MangaController } from "../InterfaceAdapter/MangaController";
import { ListAllMangas } from "../Application/Manga/ListAllMangas";
import { UploadOneManga } from "../Application/Manga/UploadOneManga";

import {pool} from "./MySql/MySqlPool";
import { MangaMapper } from "./MySql/Manga/MangaMapper";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
    pool: asValue(pool),

    mangaController: asClass(MangaController).singleton(),
    mangaRepository: asClass(MangaRepository).singleton(),

    mangaMapper: asClass(MangaMapper).singleton(),

    getAllMangasUseCase: asClass(ListAllMangas).singleton(),
	insertOneMangaUseCase: asClass(UploadOneManga).singleton(),
});

export { container };

/*
pasos: 
-configuracion de libreria awilix y container de libreria
-dentro del container, matchear las interfaces con clases reales
-exportarlo para en cualquier lugar poder container.resolve<MangaController>("mangaController");
*/