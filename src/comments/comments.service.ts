import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { TasksService } from "../tasks/tasks.service";
import { firstValueFrom, Observable } from "rxjs";
import { CommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentsService {

  constructor(
    @Inject("COMMENTS") private client: ClientProxy,
    private taskService: TasksService
  ) {
  }

  async create(dto: CreateCommentDto, userId: string): Promise<CommentDto> {
    await this.taskService.findTaskById(dto.taskId);
    const comment$ = this.client.send<CommentDto>({ cmd: "createComment" }, { ...dto, userId: userId });
    return await firstValueFrom(comment$)
  }

  async findAll(): Promise<CommentDto[]> {
    const comments$ = this.client.send<CommentDto[]>({ cmd: "getAllComments" }, "")
    return await firstValueFrom(comments$)
  }

  async findAllByTask(taskId: string):Promise<CommentDto[]> {
    await this.taskService.findTaskById(taskId);
    const comments$ = this.client.send<CommentDto[]>({ cmd: "getAllCommentsByTask" }, taskId);
    return await firstValueFrom(comments$)
  }
}
