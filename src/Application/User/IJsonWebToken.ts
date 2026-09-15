export type TokenPayload = {
    userId: number;
    email: string;
};

export interface ITokenService {
    generateToken(payload: TokenPayload): string;
    verify(token: string): Promise<TokenPayload>;
}