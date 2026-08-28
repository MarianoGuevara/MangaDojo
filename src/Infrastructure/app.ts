import express from 'express';
import { mangaRoutes } from './Express/MangaRoutes';
import { container } from "./Dependency";
import { MangaController } from '../InterfaceAdapter/MangaController';
import { MangaRepository } from './MySql/MangaRepository';
import { MangaWithAuthorMapper } from '../InterfaceAdapter/MangaWithAuthorMapper';
import { MangaMapper } from '../InterfaceAdapter/MangaMapper';
import { errorHandler } from './Express/middleware';

// App express
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Dependencias
const mangaController = container.resolve<MangaController>("mangaController");
container.resolve<MangaRepository>("mangaRepository");

container.resolve<MangaWithAuthorMapper>("mapperMangaWithAuthor");
container.resolve<MangaMapper>("mapperManga");

// Routes
const mangaRoutesInstance = mangaRoutes(mangaController);

app.use('/api/mangas', mangaRoutesInstance);


// Middleware global de errores
app.use(errorHandler);

app.listen(PORT, () => {
  	console.log(`Servidor corriendo en el puerto ${PORT}`);
});