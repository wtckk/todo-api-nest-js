import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto{
  @ApiProperty({ example: "ADMIN", description: "Значение роли" })
  readonly value: string;

  @ApiProperty({ example: "66ce58e9-c926-4ee3-b9e1-361fff35bb08", description: "Идентификатор пользователя" })
  readonly userId: string;
}