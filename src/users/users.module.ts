import { Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Task } from "../tasks/tasks.entity";


@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User, Task]),
  ],
  providers: [
    UsersService
  ],
  exports: [UsersService]
})
export class UsersModule {}
