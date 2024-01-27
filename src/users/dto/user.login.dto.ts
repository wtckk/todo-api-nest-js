import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto{
  @ApiProperty({example: 'user@user.com', description: 'Почтовый адрес'})
  email: string;

  @ApiProperty({example: 'password', description: 'Пароль'})
  password: string;
}