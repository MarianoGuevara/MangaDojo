import { createContainer, asClass, InjectionMode } from "awilix";
import { IMangaRepository } from "../Application/Manga/IMangaRepository";

const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

container.register({
//   mangaRepository: asClass(MySqlMangaRepository).singleton(),
});

export { container };

/*
pasos: 
-configuracion de libreria awilix y container de libreria
-dentro del container, matchear las interfaces con clases reales
-exportarlo para en cualquier lugar poder container.resolve<MangaController>("mangaController");
*/