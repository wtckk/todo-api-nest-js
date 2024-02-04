import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put, Query,
  UseGuards
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { CreateTaskDto } from "./dto/create.task.dto";
import { TasksService } from "./tasks.service";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Task } from "./tasks.entity";
import { UserDecorator } from "../users/decorator/user.decorator";
import { UserDto } from "../users/dto/user.dto";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { UserRole } from "../users/enums/user-role.enum";
import { UpdateTaskDto } from "./dto/update.task.dto";
import { TaskFilterSortDto } from "./dto/task-filter.dto";
import { TaskStatusEnum } from "./enum/task-status.enum";
import { TaskSortFieldEnum } from "./enum/task-sort-field.enum";

@ApiTags("Задачи")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
  }

  @ApiOperation({summary: "Получение списка всех задач для администратора"})
  @ApiResponse({status: 200, type: [Task]})
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Get('all')
  findAll(){
    return this.taskService.findAll()
  }

  @ApiOperation({summary: "Фильтрация и сортировка задач пользователя"})
  @ApiQuery({
    name: 'title',
    description: 'Поиск по точному названию задачи',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'search',
    description: 'Поисковой запрос',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'status',
    description: 'Сортировка по статусу',
    required: false,
    enum: TaskStatusEnum,
  })
  @ApiQuery({
    name: 'sortBy',
    description: 'Сортировка по возрастанию/убыванию',
    required: false,
    enum: ['ASC', 'DESC'],
  })
  @ApiQuery({
    name: 'field',
    description: 'Сортировка по полю',
    required: false,
    enum: TaskSortFieldEnum,
  })
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
  @ApiResponse({status: 201, type: Task})
  @Post('create')
  createTask(@Body() dto: CreateTaskDto, @UserDecorator() user: UserDto){
    return this.taskService.createTask(dto, user)
  }


  @ApiOperation({summary: "Получение задач определенного пользователя"})
  @ApiResponse({status: 200, type: [Task]})
  @Get('get-by-user/:id')
  findTaskByUser(@Param('id', new ParseUUIDPipe({version: "4"})) id: string){
    return this.taskService.findTaskByUser(id)
  }

  @ApiOperation({summary: "Обновление информации о задаче"})
  @ApiResponse({status: 201, type: Task})
  @Put('update/:id')
  updateTask(@Param('id', new ParseUUIDPipe({version: "4"})) id: string, @Body() dto: UpdateTaskDto, @UserDecorator() user: UserDto){
    return this.taskService.updateTask(id, dto)
  }

  @ApiOperation({summary: "Удаление задачи"})
  @ApiResponse({status: 200})
  @Delete('delete/:id')
  deleteTask(@Param('id', new ParseUUIDPipe({version: "4"})) id: string){
    return this.taskService.deleteTask(id)
  }


}
