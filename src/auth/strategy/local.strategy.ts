import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      { usernameField: 'email' }
    ); //config
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({email, password});

    if (!user) {
      throw new UnauthorizedException({ message: "Неккоретный email или пароль" });
    }
    return user;
  }
}