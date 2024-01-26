import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { UserLoginDto } from "../users/dto/user.login.dto";
import { CreateUserDto } from "../users/dto/user.create.dto";


@Controller("api/v1/auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalStrategy)
  @Post("login")
  async login(@Body() user: UserLoginDto) {
    return await this.authService.login(user);
  }

  @Post("register")
  async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }
}
