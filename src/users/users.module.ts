import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Role } from "../roles/entity/roles.entity";
import { UserRole } from "../roles/entity/user-roles.entity";
import { RolesModule } from "../roles/roles.module";


@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRole]),
    RolesModule
  ],
  providers: [
    UsersService
  ],
  exports: [UsersService]
})
export class UsersModule {}
