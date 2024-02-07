import { Controller } from '@nestjs/common';
import { CommentsService } from "./comments.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller()
export class CommentsController {
  constructor(private commentService: CommentsService) {
  }

  @MessagePattern({ cmd: 'createComment' })
  createComment(dto: CreateCommentDto){
    return this.commentService.create(dto)
  }

  @MessagePattern({ cmd: 'getAllCommentsByTask' })
  findAllByTask(taskId: string){
    return this.commentService.findAllByTask(taskId)
  }

  @MessagePattern({cmd: 'getAllComments'})
  findAll(){
    return this.commentService.findAll()
  }

}
