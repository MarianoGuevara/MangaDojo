import { Router } from 'express';
import { AuthorController } from '../../InterfaceAdapter/AuthorController';
import { ExpressMapper } from './ExpressMapper';
import { authMiddleware } from './middlewareAuth';
import { ITokenService } from '../../Application/User/IJsonWebToken';

export const authorRoutes = (
    authorController: AuthorController,
    tokenService: ITokenService
): Router => {
  const router = Router();

  const auth = authMiddleware(tokenService);

  router.post("/", 
    auth, 
    async (req, res) => {
        const httpRequest = ExpressMapper.toHttpRequest(req);
        const httpResponse = await authorController.uploadOneAuthor(httpRequest);
        ExpressMapper.toExpressResponse(res, httpResponse);
    }
  );

  return router;
};