import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserDecorator } from "../users/decorator/user.decorator";
import { UserDto } from "../users/dto/user.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@ApiTags("Комментарии")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/v1/comments")
export class CommentsController {
  constructor(private commentService: CommentsService) {
  }

  @ApiOperation({ summary: "Создания комментария" })
  @ApiResponse({ status: 201 })
  @Post("create")
  create(@Body() dto: CreateCommentDto, @UserDecorator() user: UserDto) {
    return this.commentService.create(dto, user.id);
  }

  @ApiOperation({ summary: "Получение всех комментариев" })
  @ApiResponse({ status: 200 })
  @Get("all")
  findAll() {
    const comments = this.commentService.findAll();

    return comments
  }

  @ApiOperation({ summary: "Получение комментария определенной задачи" })
  @ApiResponse({ status: 200 })
  @Get("by-task/:taskId")
  findAllByTask(@Param("taskId", new ParseUUIDPipe({ version: "4" })) taskId: string) {
    return this.commentService.findAllByTask(taskId);
  }


}
