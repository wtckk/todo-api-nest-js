import { UserRole } from "../enums/user-role.enum";
import { IsEnum, IsString } from "class-validator";

export class UserAddRole {
  @IsString()
  userId: string;

  @IsEnum(UserRole, {message: "Роль не существует"})
  role: UserRole;
}