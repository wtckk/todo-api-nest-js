import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserLoginDto{
  @ApiProperty({example: 'user@user.com', description: 'Почтовый адрес'})
  email: string;

  @ApiProperty({example: 'password', description: 'Пароль'})
  @Expose()
  password: string;
}