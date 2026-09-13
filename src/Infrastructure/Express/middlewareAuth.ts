// infrastructure/http/middlewares/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import {IJsonWebToken} from "../../Application/User/IJsonWebToken";
import { UnauthorizedException } from '../../Entities/Exceptions/UnauthorizedException';

// Extendemos el tipo Request de Express para inyectar la sesión decodificada
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export class AuthMiddleware {
    private readonly tokenProvider: IJsonWebToken;
    
    constructor(tokenProvider: IJsonWebToken) {
      this.tokenProvider = tokenProvider;
    }

    public handle = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
        console.log("PIJIN");
        console.log(req.headers);

    const authHeader = req.headers.authorization;
    console.log("authHeader: ", authHeader);
    // // 1. Validar que la cabecera traiga el formato "Bearer <token>"
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     throw new UnauthorizedException('Acceso denegado: Token no proporcionado.');
    // }

    // const token = authHeader.split(' ')[1];

    // try {
    //   // 2. Verificar la firma y expiración del JWT
    //   const payload = this.tokenProvider.verifyToken(token);

    //   // 3. Guardar el payload verificado en el objeto req
    //   req.user = payload;

    //   // 4. Dejar pasar la petición al Controlador
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado.');
    }
  };
}