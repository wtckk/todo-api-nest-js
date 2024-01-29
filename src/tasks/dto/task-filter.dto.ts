import { TaskStatusEnum } from "../enum/task-status.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskSortFieldEnum } from "../enum/task-sort-field.enum";
import { Transform } from "class-transformer";

export class TaskFilterSortDto{
  @ApiProperty({example: "Todo app", description: "Название задачи"})
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty({example: "to", description: "Поисковой запрос"})
  @IsOptional()
  @IsString()
  search: string

  @ApiProperty({ example: TaskStatusEnum.NEW, description: 'Статус задачи' })
  @Transform((params) => (params.value === '' ? null : params.value))
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum | undefined

  @ApiProperty({ example: "ASC", description: "Сортировка по убыванию/возрастанию"})
  sortBy: 'ASC' | 'DESC';

  @ApiProperty({ example: TaskSortFieldEnum.TITLE, description: 'Поля для сортировки' })
  @Transform((params) => (params.value === '' ? null : params.value))
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  field?: TaskSortFieldEnum | undefined ;
}