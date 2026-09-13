import { User } from "../../../Entities/User";
import { MySqlUser } from "./Dtos/MySqlUser";

export class UserMapper {
    toEntityFromUser(user: MySqlUser): User {
        return new User(
            user.id,
            user.name,
            user.surname,
            user.nickname,
            user.email,
            user.password,
            user.created_at,
            user.role
        )
    }

    toUserFromEntity(user: User): MySqlUser {
        return new MySqlUser(
            user.Id,
            user.Name,
            user.Surname,
            user.Nickname,
            user.Email,
            user.Password,
            user.CreatedAt,
            user.Role
        )
    }
}