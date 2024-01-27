import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class RoleCreateDto{
  @ApiProperty({ example: "ADMIN", description: "Значение роли" })
  value: string;

  @ApiProperty({ example: "Администратор", description: "Описание роли" })
  description: string;
}