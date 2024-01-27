import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/users.entity";

@Entity("user-")
export class UserRole {
  @ApiProperty({ example: "1b523fbc9-b380-3b16-9012-2322acea3c8f8", description: "Уникальный идентификатор" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ example: "66ce58e9-c926-4ee3-b9e1-361fff35bb08", description: "Идентификатор пользователя" })
  @Column({ type: "varchar", nullable: false })
  userId: string;

  @ApiProperty({ example: "74302f0f-a95e-46e5-8533-109cac7e4c58", description: "Идентификатор роли" })
  @Column({ type: "varchar", nullable: false})
  roleId: string;

}