import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../enums/user-role.enum";
export class UserDto{
  @ApiProperty({example: '1b8cfbc9-b380-4e16-9012-292acea3c8f8', description: 'Уникальный идентификатор'})
  id: string;

  @ApiProperty({example: 'Никита', description: 'Имя пользователя'})
  first_name: string;

  @ApiProperty({example: 'Шутников', description: 'Фамилия пользователя'})
  last_name: string;

  @ApiProperty({example: 'user@user.com', description: 'Почтовый адрес'})
  email: string;

  @ApiProperty({example: ['member', 'admin'], description:'Роль'})
  roles: UserRole[]
}