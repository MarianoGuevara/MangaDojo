import { User } from "../../../Entities/User";
import { MySqlUser } from "./Dtos/MySqlUser";
import { MySqlUserRow } from "./Dtos/MySqlUserRow";
import { UserGet } from "../../../Application/User/UserReadDtos/UserGet";

export class UserMapper {
    toReadDtoFromRow(user: MySqlUserRow): UserGet {
        return new UserGet(
            user.id,
            user.name,
            user.surname,
            user.nickname,
            user.email,
            user.password,
            user.created_at,
            user.role,
            user.born_at,
            user.profile_picture
        )
    }

    toMySqlUserFromEntity(user: User): MySqlUser {
        return new MySqlUser(
            user.Id,
            user.Name,
            user.Surname,
            user.Nickname,
            user.Email,
            user.PasswordHash,
            user.CreatedAt,
            user.Role,
            user.BornAt,
            user.ProfilePicture
        )
    }
}