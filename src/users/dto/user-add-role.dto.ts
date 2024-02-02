import { UserRole } from "../enums/user-role.enum";
import { IsArray, IsEnum, IsString, Validate, ValidationError } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserAddRole {
  @ApiProperty({ example: "1b8cfbc9-b380-4e16-9012-292acea3c8f8", description: "Уникальный идентификатор" })
  @IsString()
  userId: string;

  @ApiProperty({ example: "admin", description: "Роль" })
  role: UserRole;
}