import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaskCommentsService } from "./task-comments.service";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { UserRole } from "../users/enums/user-role.enum";
import { RolesGuard } from "../auth/guard/roles.guard";
import { TaskComment } from "./task-comment.entity";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@ApiTags("Комментарии")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/v1/task-comments")
export class TaskCommentsController {
  constructor(private taskCommentService: TaskCommentsService) {
  }

  @ApiOperation({summary: "Получение списка всех комментариев"})
  @ApiResponse({status: 200, type: [TaskComment]})
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Get('all')
  findAll(){
    return this.taskCommentService.findAll()
  }
}
