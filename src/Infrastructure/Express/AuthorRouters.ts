import { Router } from 'express';
import { AuthorController } from '../../InterfaceAdapter/AuthorController';
import { ExpressMapper } from './ExpressMapper';


export const authorRoutes = (authorController: AuthorController): Router => {
  const router = Router();

  router.post("/", async (req, res) => 
      {
          const httpRequest = ExpressMapper.toHttpRequest(req);
          const httpResponse = await authorController.uploadOneAuthor(httpRequest);
          ExpressMapper.toExpressResponse(res, httpResponse);
      }
  );
  return router;
};