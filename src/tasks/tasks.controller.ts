import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put, Query,
  UseGuards
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { CreateTaskDto } from "./dto/create.task.dto";
import { TasksService } from "./tasks.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Task } from "./tasks.entity";
import { UserDecorator } from "../users/decorator/user.decorator";
import { UserDto } from "../users/dto/user.dto";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { UserRole } from "../users/enums/user-role.enum";
import { UpdateTaskDto } from "./dto/update.task.dto";
import { TaskFilterSortDto } from "./dto/task-filter.dto";

@ApiTags("Задачи")
@UseGuards(JwtAuthGuard)
@Controller('api/v1/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
  }

  @ApiOperation({summary: "Получение списка всех задач"})
  @ApiResponse({status: 200, type: [Task]})
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Get('all')
  findAll(){
    return this.taskService.findAll()
  }

  @ApiOperation({summary: "Фильтрация и сортировка задач пользователя"})
  @ApiResponse({status: 200, type: [Task]})
  @Get()
  findTasksWithFilter(@Query() filterSortDto: TaskFilterSortDto, @UserDecorator() user: UserDto){
    return this.taskService.findTaskWithFilter(filterSortDto, user.id)
  }

  @ApiOperation({summary: "Получение задачи по её идентификатору"})
  @ApiResponse({status: 200, type: Task})
  @Get('get-by-id/:id')
  findTaskById(@Param('id', new ParseUUIDPipe({version: "4"})) id: string): Promise<Task>{
    return this.taskService.findTaskById(id)
  }

  @ApiOperation({summary: "Создание новой задачи"})
  @ApiResponse({status: 200, type: Task})
  @Post('create')
  createTask(@Body() dto: CreateTaskDto, @UserDecorator() user: UserDto){
    return this.taskService.createTask(dto, user.id)
  }


  @ApiOperation({summary: "Получение задач определенного пользователя"})
  @ApiResponse({status: 200, type: [Task]})
  @Get('get-by-user/:id')
  findTaskByUser(@Param('id', new ParseUUIDPipe({version: "4"})) id: string){
    return this.taskService.findTaskByUser(id)
  }

  @ApiOperation({summary: "Обновление информации о задаче"})
  @ApiResponse({status: 200, type: Task})
  @Put('update/:id')
  updateTask(@Param('id', new ParseUUIDPipe({version: "4"})) id: string, @Body() dto: UpdateTaskDto){
    return this.taskService.updateTask(id, dto)
  }

  @ApiOperation({summary: "Удаление задачи"})
  @ApiResponse({status: 200})
  @Delete('delete/:id')
  deleteTask(@Param('id', new ParseUUIDPipe({version: "4"})) id: string){
    return this.taskService.deleteTask(id)
  }


}
