import jwt from 'jsonwebtoken';
import { ITokenService } from '../../Application/User/IJsonWebToken';
import { TokenPayload } from "../../Application/User/IJsonWebToken";

export class JwtTokenProvider implements ITokenService {
                    // Es la "firma Digital" de mi servidor
    constructor(private readonly secretKey: string) {}

    generateToken(payload: TokenPayload): string {
        return jwt.sign(
            payload, 
            this.secretKey, 
            { expiresIn: '8h' }
        );
    }

    // verifica que el token sea valido, no haya expirado ni sido modificado. 
    // si es valido devuelve el payload del token
    async verify(token: string): Promise<TokenPayload> {
        
        // jwt.verify síncrono lanza una excepción directamente si falla
        const decoded = jwt.verify(token, this.secretKey);
        return decoded as TokenPayload;
    }
}