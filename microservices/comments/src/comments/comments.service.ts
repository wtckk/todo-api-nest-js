import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./comments.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>
  ) {
  }

  async create(dto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(dto);
    return await this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      order: {
        createdAt: "DESC"
      }
    });
    return comments;
  }
  async findAllByTask(taskId: string): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: {
        taskId
      },
      order: {
        createdAt: "DESC"
      }
    });
    return comments;
  }


}
