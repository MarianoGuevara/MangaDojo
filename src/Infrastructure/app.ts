import express from 'express';
import { mangaRouter } from './Routes/MangaRoutes';

// App express
const app = express();
const PORT = process.env.PORT || 3000;

// Dependencias

// Middlewares
app.use(express.json());

// Routes
app.use('/api/mangas', mangaRouter);


// Middleware global de errores
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});