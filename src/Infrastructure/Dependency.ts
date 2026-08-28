import { createContainer, asClass, asValue, InjectionMode } from "awilix";
import { MangaRepository } from "./MySql/MangaRepository";
import { MangaController } from "../InterfaceAdapter/MangaController";
import { GetAllMangaUseCase } from "../Application/Manga/GetAllUseCase";
import { InsertOneMangaUseCase } from "../Application/Manga/InsertOneUseCase";
import { MangaMapper } from "../InterfaceAdapter/MangaMapper";
import { MangaWithAuthorMapper } from "../InterfaceAdapter/MangaWithAuthorMapper";

import {pool} from "./MySql/MySqlPool";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
    pool: asValue(pool),

    mangaController: asClass(MangaController).singleton(),
    mangaRepository: asClass(MangaRepository).singleton(),

	mapperMangaWithAuthor: asClass(MangaWithAuthorMapper).singleton(),
    mapperManga: asClass(MangaMapper).singleton(),

    getAllMangasUseCase: asClass(GetAllMangaUseCase).singleton(),
	insertOneMangaUseCase: asClass(InsertOneMangaUseCase).singleton(),
});

export { container };

/*
pasos: 
-configuracion de libreria awilix y container de libreria
-dentro del container, matchear las interfaces con clases reales
-exportarlo para en cualquier lugar poder container.resolve<MangaController>("mangaController");
*/