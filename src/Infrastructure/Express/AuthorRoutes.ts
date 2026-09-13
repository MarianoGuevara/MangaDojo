import { Router } from 'express';
import { AuthorController } from '../../InterfaceAdapter/AuthorController';
import { ExpressMapper } from './ExpressMapper';
import { AuthMiddleware } from './middlewareAuth';

export const authorRoutes = (authorController: AuthorController, authMiddleware: AuthMiddleware): Router => {
  const router = Router();

  router.post("/", 
    (req, res, next) => authMiddleware.handle(req, res, next),
    async (req, res) => 
    
      {
          const httpRequest = ExpressMapper.toHttpRequest(req);
          const httpResponse = await authorController.uploadOneAuthor(httpRequest);
          ExpressMapper.toExpressResponse(res, httpResponse);
      }
  );
  return router;
};