import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RoleCreateDto } from "./dto/role.create.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { Role } from "./entity/roles.entity";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "../auth/decorator/role-auth.decorator";

@ApiTags("Роли")
@Controller("api/v1/roles")
export class RolesController {
  constructor(private roleService: RolesService) {
  }
  @ApiOperation({ summary: "Создание роли" })
  @ApiResponse({ status: 200})
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post("create")
  createRole(@Body() roleDto: RoleCreateDto) {
    return this.roleService.createRole(roleDto);
  }

  @ApiOperation({ summary: "Получение роли по значению" })
  @ApiResponse({ status: 200})
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("get-by-value/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value)
  }

}
