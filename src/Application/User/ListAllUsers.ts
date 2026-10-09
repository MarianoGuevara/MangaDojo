import { IUserRepositoryRead } from "./IUserRepository";
import { UserGet } from "./UserReadDtos/UserGet";

export class ListAllUsers {
    private userReadRepository: IUserRepositoryRead;

    constructor(userReadRepository: IUserRepositoryRead) {
        this.userReadRepository = userReadRepository;
    }

    async execute(): Promise<UserGet[]> {
        return this.userReadRepository.getAll();
    }
}