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

    async verify(token: string): Promise<TokenPayload> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded as TokenPayload);
                }
            });
        });
    }
}