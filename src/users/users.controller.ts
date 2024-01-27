import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.entity";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { AddRoleDto } from "./dto/add-role.dto";


@ApiTags("Пользователи")
@Controller("api/v1/users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({ summary: "Получение списка всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto){
    return this.usersService.addRole(addRoleDto)
  }
}
