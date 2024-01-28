import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.entity";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { UserRole } from "./enums/user-role.enum";
import { UserAddRole } from "./dto/user-add-role.dto";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "../auth/decorator/role-auth.decorator";


@ApiTags("Пользователи")
@Controller("api/v1/users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({ summary: "Получение списка всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("all")
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: "Поиск по идентификатору пользователя" })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get("id/:id")
  findUserById(@Param("id") id: string) {
    const user = this.usersService.findUserById(id);
    return user;
  }

  @ApiOperation({ summary: "Выдача роли" })
  @ApiResponse({ status: 200})
  @Post('/role')
  addRole(@Body() dto: UserAddRole){
    return this.usersService.addRole(dto)
  }
}
