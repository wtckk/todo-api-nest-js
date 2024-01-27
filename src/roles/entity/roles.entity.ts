import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/users.entity";

@Entity("roles")
export class Role {
  @ApiProperty({ example: "1b523fbc9-b380-3b16-9012-2322acea3c8f8", description: "Уникальный идентификатор" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ example: "admin", description: "Значение роли" })
  @Column({ type: "varchar", length: 32, unique: true, nullable: false })
  value: string;

  @ApiProperty({ example: "Администратор", description: "Описание роли" })
  @Column({ type: "varchar", length: 200})
  description: string;

  @ManyToMany(() => User, user => user.roles)
  users: User[]
}