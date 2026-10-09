import { Author } from "../../Entities/Author";
import { IAuthorRepositoryRead, IAuthorRepositoryWrite } from "./IAuthorRepository";
import { DuplicateException } from "../../Entities/Exceptions/DuplicateException";

export interface UploadOneAuthorInputDTO {
    name: string;
    surname: string;
    nickname : string | null;
}

export interface UploadOneAuthorResponseDTO {
    id: number;
}

export class UploadOneAuthor {
    private authorReadRepository: IAuthorRepositoryRead;
    private authorWriteRepository: IAuthorRepositoryWrite;

    constructor(authorReadRepository: IAuthorRepositoryRead, authorWriteRepository: IAuthorRepositoryWrite) {
        this.authorReadRepository = authorReadRepository;
        this.authorWriteRepository = authorWriteRepository;
    }

    async execute(authorDto: UploadOneAuthorInputDTO): Promise<UploadOneAuthorResponseDTO> {
        const author = new Author(
            authorDto.name,
            authorDto.surname,
            authorDto.nickname
        )

        const repositoryAuthor = await this.authorReadRepository.getByNameAndSurname(
            author.Name, 
            author.Surname
        );
        
        if (repositoryAuthor == null) {
            
            const savedAuthor = await this.authorWriteRepository.insertOne(author);
            
            return {
                id: savedAuthor.Id
            };

        } else { throw new DuplicateException("The author already exists"); }
    }
}