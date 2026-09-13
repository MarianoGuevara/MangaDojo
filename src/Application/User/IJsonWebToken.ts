export type TokenPayload = {
    userId: number;
    email: string;
};

export interface IJsonWebToken {
    generateToken(payload: TokenPayload): string;
}
