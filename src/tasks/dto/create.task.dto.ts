import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MaxLength } from "class-validator";

export class CreateTaskDto{

  @ApiProperty({ example: 'Починить кран в ванной', description: 'Название задачи' })
  @IsString()
  title: string

  @ApiProperty({ example: 'Описание задачи', description: 'Описание задачи' })
  @IsString()
  @MaxLength(200, {message: "Максимальное значение символов 200"})
  description: string;

}