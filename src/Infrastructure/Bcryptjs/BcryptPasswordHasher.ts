import bcrypt from 'bcryptjs';
import { IHasher } from "../../Application/Shared/IHasher";

export class BcryptPasswordHasher implements IHasher {
    async hash(plainText: string): Promise<string> {
        return bcrypt.hash(plainText, 10);
    }

    async compare(plainText: string, hashedText: string): Promise<boolean> {
        return bcrypt.compare(plainText, hashedText);
    }
}