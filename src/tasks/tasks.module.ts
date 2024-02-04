import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./tasks.entity";
import { User } from "../users/users.entity";
import { TaskComment } from "../task-comments/task-comment.entity";

@Module({
  controllers: [TasksController],
  providers: [
    TasksService
  ],
  imports: [
    TypeOrmModule.forFeature([Task, User, TaskComment])
  ],
  exports: [
    TasksService
  ]
})
export class TasksModule {}
