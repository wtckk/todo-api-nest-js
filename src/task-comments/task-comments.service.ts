import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskComment } from "./task-comment.entity";
import { Repository } from "typeorm";
import { CreateTaskCommentDto } from "./dto/create.task-comment.dto";
import { TasksService } from "../tasks/tasks.service";

@Injectable()
export class TaskCommentsService {
  constructor(
    @InjectRepository(TaskComment) private taskCommentRepository: Repository<TaskComment>,
    private taskService: TasksService
  ) {
  }

  async create(dto: CreateTaskCommentDto, userId: string): Promise<TaskComment> {
    await this.taskService.findTaskById(dto.taskId)
    const comment = this.taskCommentRepository.create({ ...dto, userId: userId });
    return await this.taskCommentRepository.save(comment);
  }

  async findAllOfTask(taskId: string) {
    await this.taskService.findTaskById(taskId)
    return await this.taskCommentRepository.find({
      where: {
        taskId: taskId
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAll() {
    return await this.taskCommentRepository.find({
      order: {
        createdAt: "DESC"
      }
    });
  };


}
