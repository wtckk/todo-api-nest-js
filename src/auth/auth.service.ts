import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/user.create.dto";
import { UserLoginDto } from "../users/dto/user.login.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
  }

  async validateUser(userDto: UserLoginDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const equalPassword = await bcrypt.compare(userDto.password, user.password);

    if (user && equalPassword) {
      return user;
    }

    throw new UnauthorizedException({ message: "Некорректный email или пароль" });
  }

  async login(userDto: UserLoginDto) {
    const user = await this.validateUser(userDto);
    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      roles: user.roles
    };
    return {
      token: this.jwtService.sign(payload)
    };
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new BadRequestException({ message: "Пользователь с данным email уже существует" });
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword });

    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      roles: user.roles
    };

    return {
      token: this.jwtService.sign(payload)
    };
  }

  async getUserByToken(token: string) {
    const secret_key = this.configService.get("SECRET")
    try {
      const payload = await this.jwtService.verify(token, secret_key)
      const userId = payload.id
      if (userId) {
        return await this.usersService.findUserById(userId)
      }
    } catch (e){
      return undefined
    }
  }
}
