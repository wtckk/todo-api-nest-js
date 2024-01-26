import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class UserLoginDto{
  @ApiProperty({example: 'user@user.com', description: 'Почтовый адрес'})
  email: string;

  @ApiProperty({example: 'password', description: 'Пароль'})
  password: string;
}