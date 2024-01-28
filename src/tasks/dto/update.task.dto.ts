import { TaskStatusEnum } from "../enum/task-status.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, MaxLength } from "class-validator";

export class UpdateTaskDto{
  @ApiProperty({ example: 'Починить кран в ванной', description: 'Название задачи' })
  @IsString()
  title: string

  @ApiProperty({ example: 'Описание задачи', description: 'Описание задачи' })
  @IsString()
  @MaxLength(200, {message: "Максимальное значение символов 200"})
  description: string;

  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum
}