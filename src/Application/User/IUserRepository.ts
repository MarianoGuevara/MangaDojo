import { User } from "../../Entities/User";
import { UserGet } from "./UserReadDtos/UserGet";

export interface IUserRepositoryRead {
    getAll(): Promise<UserGet[]>;
    findByEmail(email: string): Promise<UserGet | undefined>;
}

export interface IUserRepositoryWrite {
    save(user: User): Promise<User>;
}