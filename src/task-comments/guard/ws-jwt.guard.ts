import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { AuthService } from "../../auth/auth.service";
import { use } from "passport";

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const token = client.handshake.headers.authorization.split(" ")[1];

    const user = await this.authService.getUserByToken(token)
    if (!user){
      client.disconnect()
      throw new WsException('Некорректный токен');
    }

    client.data.user = user
    return true

  }
}