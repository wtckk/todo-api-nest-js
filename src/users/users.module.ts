import { Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Task } from "../tasks/tasks.entity";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";


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
