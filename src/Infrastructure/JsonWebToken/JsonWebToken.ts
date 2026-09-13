import jwt from 'jsonwebtoken';
import { IJsonWebToken } from '../../Application/User/IJsonWebToken';
// import { TokenProvider } from '../../domain/services/TokenProvider';

export class JwtTokenProvider implements IJsonWebToken {
                    // Es la "firma Digital" de mi servidor
    constructor(private readonly jwtSecret: string) {}

    generateToken(payload: { userId: number; email: string }): string {
        return jwt.sign(
            payload, 
            this.jwtSecret, 
            { expiresIn: '8h' }
        );
    }

    // compareToken(token: string): { userId: number; email: string } | null {
    //     try {
    //         const decoded = jwt.verify(token, this.jwtSecret) as { userId: number; email: string };
    //         return decoded;
    //     } catch (error) {
    //         return null;
    //     }
    // }
}