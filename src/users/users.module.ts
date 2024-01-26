import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { AuthModule } from "../auth/auth.module";


@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UsersService
  ],
  exports: [UsersService]
})
export class UsersModule {}
