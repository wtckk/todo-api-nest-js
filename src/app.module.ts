import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { User } from "./users/users.entity";
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from "./tasks/tasks.entity";
import { TaskCommentsModule } from './task-comments/task-comments.module';
import { TaskComment } from "./task-comments/task-comment.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Task, TaskComment],
      synchronize: true,
      autoLoadEntities: true,
      logging: ["query", "error"]
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    TaskCommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
