// infrastructure/http/middlewares/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ITokenService, TokenPayload } from '../../Application/User/IJsonWebToken';
import { UnauthorizedException } from '../Exceptions/UnauthorizedException';

export function authMiddleware(tokenProvider: ITokenService) {
    return async (req: Request, res: Response, next: NextFunction) => {
        
        console.log("Headers recibidos:", req.headers);
        console.log("Token recibido:", req.headers.authorization);
        
        // en request.header.authorization va a viajar el token
        const AuthField = req.headers.authorization;

        if (!AuthField) return next(new UnauthorizedException('Token requerido'));

        const token = AuthField.split(" ")[1]; // viene "Bearer token" asi q descarto "Bearer "

        try {
            const payload = await tokenProvider.verify(token);
            
            // al request le agrego un campo user para que los controladores puedan acceder al user validado
            (req as { user?: TokenPayload }).user = payload; 
            
            next();
        } catch (error) {
            return next(new Error('Ocurrió un error en la verificación del token'));
        }
    };
}