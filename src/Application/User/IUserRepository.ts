import { User } from "../../Entities/User";

export interface IUserRepository {
    getAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | undefined>;
}