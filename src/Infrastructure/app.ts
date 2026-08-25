import express from 'express';
import { mangaRoutes } from './Express/MangaRoutes';
import { container } from "./Dependency";
import { MangaController } from '../InterfaceAdapter/MangaController';
import { MangaRepository } from './MySql/MangaRepository';

// App express
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Dependencias
const mangaController = container.resolve<MangaController>("mangaController");
const repository = container.resolve<MangaRepository>("mangaRepository");


// Routes
const mangaRoutesInstance = mangaRoutes(mangaController);

app.use('/api/mangas', mangaRoutesInstance);


// Middleware global de errores
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});