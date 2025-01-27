import { UserRole } from "../users-role.enum";
import { User } from "../users.entity";

export class UserResponseDto {
    email: string;
    role: UserRole;

    constructor(user: User) {
        this.email = user.email;
        this.role = user.role;
    }
}