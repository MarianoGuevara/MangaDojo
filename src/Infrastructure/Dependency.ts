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
import { UserController } from "../InterfaceAdapter/UserController";
import { LoginUserUseCase } from "../Application/User/LoginUser";
import { RegisterUserUseCase } from "../Application/User/RegisterUser";
import { UserRepository } from "./MySql/User/UserRepository";
import { BcryptPasswordHasher } from "./Bcryptjs/BcryptPasswordHasher";
import { JwtTokenProvider } from "./JsonWebToken/JsonWebToken";
import { UserMapper } from "./MySql/User/UserMapper";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
    pool: asValue(pool),
    secretKey: asValue(process.env.JWT_SECRET),

    mangaController: asClass(MangaController).singleton(),
    authorController: asClass(AuthorController).singleton(),
    userController: asClass(UserController).singleton(),
    
    mangaRepository: asClass(MangaRepository).singleton(),
    authorRepository: asClass(AuthorRepository).singleton(),
    userRepository: asClass(UserRepository).singleton(),
    
    mangaMapper: asClass(MangaMapper).singleton(),
    authorMapper: asClass(AuthorMapper).singleton(),
    userMapper: asClass(UserMapper).singleton(),

    getAllMangasUseCase: asClass(ListAllMangas).singleton(),
	  insertOneMangaUseCase: asClass(UploadOneManga).singleton(),
    uploadOneAuthorUseCase: asClass(UploadOneAuthor).singleton(),

    registerUserUseCase: asClass(RegisterUserUseCase).singleton(),
    loginUserUseCase: asClass(LoginUserUseCase).singleton(),
    
    passwordHasher: asClass(BcryptPasswordHasher).singleton(),
    tokenProvider: asClass(JwtTokenProvider).singleton(),
});

export { container };

/*
pasos: 
-configuracion de libreria awilix y container de libreria
-dentro del container, matchear los parametros inyecciones de tipo clase o interfaz
 que use en las clases, con las clases concretas que quiero inyectar.
-exportarlo para en cualquier lugar poder container.resolve<MangaController>("mangaController");
*/