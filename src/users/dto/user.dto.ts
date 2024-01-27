import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../roles/entity/roles.entity";
export class UserDto{
  @ApiProperty({example: '1b8cfbc9-b380-4e16-9012-292acea3c8f8', description: 'Уникальный идентификатор'})
  id: string;

  @ApiProperty({example: 'user', description: 'Имя пользователя'})
  first_name: string;

  @ApiProperty({example: 'user', description: 'Фамилия пользователя'})
  last_name: string;

  @ApiProperty({example: 'user@user.com', description: 'Почтовый адрес'})
  email: string;

  @ApiProperty({example: ['member'], description:'Роль'})
  roles: Role[]
}