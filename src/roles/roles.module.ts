import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entity/roles.entity";
import { User } from "../users/users.entity";
import { UserRole } from "./entity/user-roles.entity";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([Role, User, UserRole])
  ],
  exports: [RolesService]
})
export class RolesModule {}
