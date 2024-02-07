import { Inject, Injectable } from "@nestjs/common";
import {  ClientProxy } from "@nestjs/microservices";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { TasksService } from "../tasks/tasks.service";
@Injectable()
export class CommentsService {

  constructor(
    @Inject('COMMENTS') private client: ClientProxy,
    private taskService: TasksService
    ) {
  }

  async create(dto: CreateCommentDto, userId: string) {
    await this.taskService.findTaskById(dto.taskId)
    return this.client.send({ cmd: "createComment" }, { ...dto, userId: userId });
  }

  async findAll() {
    return this.client.send({cmd:'getAllComments'}, '');
  }

  async findAllByTask(taskId: string) {
    await this.taskService.findTaskById(taskId)
    return this.client.send({ cmd: "getAllCommentsByTask" }, taskId);
  }
}
