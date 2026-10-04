import { User } from "../../Entities/User";
import { UserGet } from "./UserReadDtos/UserGet";

export interface IUserRepository {
    getAll(): Promise<UserGet[]>;
    findByEmail(email: string): Promise<UserGet | undefined>;
    save(user: User): Promise<User>;
}