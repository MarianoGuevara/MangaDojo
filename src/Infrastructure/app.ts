import express from 'express';
import { mangaRoutes } from './Express/MangaRoutes';
import { container } from "./Dependency";
import { MangaController } from '../InterfaceAdapter/MangaController';
import { errorHandler } from './Express/middlewareErrorHandler';
import { AuthorController } from '../InterfaceAdapter/AuthorController';
import { authorRoutes } from './Express/AuthorRoutes';
import { UserController } from '../InterfaceAdapter/UserController';
import { userRoutes } from './Express/UserRoutes';
// App express
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Dependencias
const mangaController = container.resolve<MangaController>("mangaController");
const authorController = container.resolve<AuthorController>("authorController");
const userController = container.resolve<UserController>("userController");

// Routes
const mangaRoutesInstance = mangaRoutes(mangaController);
const authorRoutesInstance = authorRoutes(authorController, container.resolve("tokenProvider"));
const userRoutesInstance = userRoutes(userController);

app.use('/api/mangas', mangaRoutesInstance);
app.use('/api/authors', authorRoutesInstance);
app.use('/api/users', userRoutesInstance);

// Middleware global de errores
app.use(errorHandler);


app.listen(PORT, () => {
  	console.log(`Servidor corriendo en el puerto ${PORT}`);
});