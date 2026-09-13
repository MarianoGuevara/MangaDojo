import { Router } from 'express';
import { ExpressMapper } from './ExpressMapper';
import { UserController } from '../../InterfaceAdapter/UserController';


export const userRoutes = (userController: UserController): Router => {
    const router = Router();
  
//   router.get("/", async (req, res) => 
//       {
//           const httpRequest = ExpressMapper.toHttpRequest(req);
//           const httpResponse = await userController.getAll(httpRequest);
//           ExpressMapper.toExpressResponse(res, httpResponse);
//       }
//   );

  router.post("/register", async (req, res) => 
      {
          
          const httpRequest = ExpressMapper.toHttpRequest(req);
          const httpResponse = await userController.registerUser(httpRequest);
          ExpressMapper.toExpressResponse(res, httpResponse);
      }
  );
  
  router.post("/login", async (req, res) => 
      {
          const httpRequest = ExpressMapper.toHttpRequest(req);
          const httpResponse = await userController.loginUser(httpRequest);
          ExpressMapper.toExpressResponse(res, httpResponse);
      }
  );

  return router;
};