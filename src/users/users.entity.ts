import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class User {
  @ApiProperty({example: '1b8cfbc9-b380-4e16-9012-292acea3c8f8', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({example: 'user', description: 'Имя пользователя'})
  @Column({ type: "varchar", length: 32, unique: false, nullable: false })
  first_name: string;

  @ApiProperty({example: 'user', description: 'Фамилия пользователя'})
  @Column({ type: "varchar", length: 32, unique: false, nullable: false })
  last_name: string;

  @ApiProperty({example: 'user@user.com', description: 'Почтовый адрес'})
  @Column({ type: "varchar", length: 250, unique: true, nullable: false })
  email: string;

  @ApiProperty({example: 'password', description: 'Пароль'})
  @Column({ type: "varchar", nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

}