import { Controller, Post, UseGuards, Body} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { UserLoginDto } from "../users/dto/user.login.dto";
import { CreateUserDto } from "../users/dto/user.create.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Авторизация")
@Controller("api/v1/auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }
  @ApiOperation({ summary: "Авторизация пользователя" })
  @UseGuards(LocalStrategy)
  @Post("login")
  async login(@Body() user: UserLoginDto) {
    return await this.authService.login(user);
  }

  @ApiOperation({ summary: "Регистрация пользователя" })
  @ApiResponse({status: 201})
  @Post("register")
  async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }

}
