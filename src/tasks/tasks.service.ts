import {  HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { CreateTaskDto } from "./dto/create.task.dto";
import { TaskFilterSortDto } from "./dto/task-filter.dto";
import { UpdateTaskDto } from "./dto/update.task.dto";
import { UserDto } from "../users/dto/user.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {
  }

  async createTask(createTaskDto: CreateTaskDto, user: UserDto) {

    const task = this.taskRepository.create({ ...createTaskDto, owner: {id: user.id, first_name: user.first_name, last_name: user.last_name}});
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: { owner: true },
      select: {
        owner: {
          id: true,
          first_name: true,
          last_name: true
        }
      }
    });
  }


  async findTaskWithFilter(filterSortDto: TaskFilterSortDto, ownerId: string) {
    const { title, status, search, field, sortBy } = filterSortDto;
    let sortCheck = sortBy
    const queryBuilder = this.taskRepository.createQueryBuilder("task");

    title && queryBuilder.andWhere('task.title = :title', {title})
    status && queryBuilder.andWhere('task.status = :status', {status})
    queryBuilder.andWhere('task.ownerId = :ownerId', {ownerId})

    if (search) {
      queryBuilder.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` });
    }


    if (field) {
      if (!sortCheck || (sortCheck !== 'ASC' && sortCheck !== 'DESC')) {
        sortCheck = 'ASC';
      }
      queryBuilder.orderBy(field, sortCheck)
    } else {
      queryBuilder.orderBy('task.createdAt', 'DESC')
    }
    return await queryBuilder.getMany()

  }

  async findTaskById(id: string) {
    const task = await this.taskRepository.findOne({
      where: {id},
      relations: { owner: true },
      select: {
        owner: {
          id: true,
            first_name: true,
            last_name: true }
      }
    }

    );
    if (!task) {
      throw new NotFoundException({ message: "Данная задача не найдена " });
    }
    return task;
  }

  async findTaskByUser(id: string) {
    const tasks = await this.taskRepository.find({
      where: {
        owner: { id }
      },
      relations: {
        owner: true
      },
      select: {
        owner: {
          id: true,
          first_name: true,
          last_name: true
        }
      }
    });
    return tasks;
  }


  async deleteTask(id: string) {
    const task = await this.findTaskById(id);
    await this.taskRepository.remove(task);
    throw new HttpException("Задача удалена", HttpStatus.OK);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);
    return await this.findTaskById(id)
  }

}
