import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTaskCommentDto{

  @ApiProperty({example: "", description: "Уникальный идентификтор задачи"})
  @IsUUID()
  taskId: string



  @ApiProperty({example: "Comment", description: "Содержание комментария"})
  @IsString()
  @IsNotEmpty()
  content: string
}