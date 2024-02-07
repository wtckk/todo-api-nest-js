import { IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto{
  @ApiProperty({example: '', description: 'Идентификатор задачи'})
  @IsUUID()
  taskId: string


  @ApiProperty({example: 'Классный ', description: 'Комментарий'})
  @IsString()
  content: string
}