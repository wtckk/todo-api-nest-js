import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto{

  @ApiProperty({example: 'user', description: 'Имя пользователя'})
  @IsAlpha('ru-RU', {message: "Должно состоять из кириллицы"})
  readonly first_name: string;

  @ApiProperty({example: 'user', description: 'Фамилия пользователя'})
  @IsAlpha('ru-RU', {message: "Должно состоять из кириллицы"})
  readonly last_name: string;

  @ApiProperty({example: 'user@user.com', description: 'Почтовый адрес'})
  @IsEmail({},{message: "Некоррктный email"})
  readonly email: string;

  @ApiProperty({example: 'password', description: 'Пароль'})
  @Length(4, 16, {message: "Пароль должбен быть не менее 4 и не более 16 символов"})
  readonly password: string;

}