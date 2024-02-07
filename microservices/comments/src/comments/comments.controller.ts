import { Controller } from '@nestjs/common';
import { CommentsService } from "./comments.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Observable } from "rxjs";
import { Comment } from "./comments.entity";

@Controller()
export class CommentsController {
  constructor(private commentService: CommentsService) {
  }

  @MessagePattern({ cmd: 'createComment' })
  async createComment(dto: CreateCommentDto): Promise<Comment>{
    return await this.commentService.create(dto)
  }

  @MessagePattern({ cmd: 'getAllCommentsByTask' })
  async findAllByTask(taskId: string): Promise<Comment[]>{
    return await this.commentService.findAllByTask(taskId)
  }

  @MessagePattern({cmd: 'getAllComments'})
  async findAll(): Promise<Comment[]>{
    return await this.commentService.findAll()
  }

}
