import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { TaskStatusEnum } from "./enum/task-status.enum";

@Entity("tasks")
export class Task{
  @ApiProperty({ example: "1b8cfbc9-b380-4e16-9012-292acea3c8f8", description: "Уникальный идентификатор задачи" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({example: "Починить кран в ванной", description: "Название задачи"})
  @Column({type: "varchar", nullable: false})
  @IsString()
  title: string

  @ApiProperty({example: "Починить кран в ванной", description: "Название задачи"})
  @Column({type: "varchar"})
  @IsString()
  description: string

  @ApiProperty({example: "Починить кран в ванной", description: "Название задачи"})
  @Column({type: "enum", enum: TaskStatusEnum, default: TaskStatusEnum.NEW})
  status: TaskStatusEnum

  @ApiProperty({ description: "Дата регистрации" })
  @CreateDateColumn()
  createdAt?: Date;
}