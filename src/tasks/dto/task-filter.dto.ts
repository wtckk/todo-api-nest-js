import { TaskStatusEnum } from "../enum/task-status.enum";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskSortFieldEnum } from "../enum/task-sort-field.enum";
import { Transform } from "class-transformer";

export class TaskFilterSortDto{
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  search: string

  @Transform((params) => (params.value === '' ? null : params.value))
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum | undefined

  sortBy: 'ASC' | 'DESC';

  @Transform((params) => (params.value === '' ? null : params.value))
  @IsOptional()
  @IsEnum(TaskSortFieldEnum)
  field?: TaskSortFieldEnum | undefined ;
}