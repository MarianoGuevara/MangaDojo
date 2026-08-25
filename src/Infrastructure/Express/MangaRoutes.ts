import { Router } from 'express';
import { MangaController } from '../../InterfaceAdapter/MangaController';
import { ExpressMapper } from './ExpressMapper';


export const mangaRoutes = (mangaController: MangaController): Router => {
  const router = Router();

  
  router.get("/", async (req, res) => 
      {
          const httpRequest = ExpressMapper.toHttpRequest(req);
          const httpResponse = await mangaController.getAll(httpRequest);
          ExpressMapper.toExpressResponse(res, httpResponse);
      }
  );

  return router;
};