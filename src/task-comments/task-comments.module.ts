import { Module } from '@nestjs/common';
import { TaskCommentsService } from './task-comments.service';
import { TaskCommentsGateway } from './task-comments.gateway';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "../tasks/tasks.entity";
import { TaskComment } from "./task-comment.entity";
import { User } from "../users/users.entity";
import { TaskCommentsController } from './task-comments.controller';
import { UsersModule } from "../users/users.module";
import { TasksModule } from "../tasks/tasks.module";
import { AuthModule } from "../auth/auth.module";
import { WsJwtGuard } from "./guard/ws-jwt.guard";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskComment, User]),
    UsersModule,
    TasksModule,
    AuthModule,
    ConfigModule
  ],
  providers: [TaskCommentsService, TaskCommentsGateway, WsJwtGuard],
  controllers: [TaskCommentsController]
})
export class TaskCommentsModule {}
