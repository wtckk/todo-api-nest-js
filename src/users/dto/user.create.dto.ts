import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{

  @ApiProperty({example: 'user', description: 'Имя пользователя'})
  readonly first_name: string;

  @ApiProperty({example: 'user', description: 'Фамилия пользователя'})
  readonly last_name: string;

  @ApiProperty({example: 'user@user.com', description: 'Почтовый адрес'})
  readonly email: string;

  @ApiProperty({example: 'password', description: 'Пароль'})
  readonly password: string;
}