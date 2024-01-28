import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./tasks.entity";
import { User } from "../users/users.entity";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@Module({
  controllers: [TasksController],
  providers: [
    TasksService
  ],
  imports: [
    TypeOrmModule.forFeature([Task, User])
  ]
})
export class TasksModule {}
