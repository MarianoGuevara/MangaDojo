import { IAuthorRepositoryRead } from "./IAuthorRepository";
import { AuthorGet } from "./AuthorReadDtos/AuthorGet";

export class ListAllAuthors {
    private authorReadRepository: IAuthorRepositoryRead;

    constructor(authorReadRepository: IAuthorRepositoryRead) {
        this.authorReadRepository = authorReadRepository;
    }

    async execute(): Promise<AuthorGet[]> {
        return this.authorReadRepository.getAll();
    }
}