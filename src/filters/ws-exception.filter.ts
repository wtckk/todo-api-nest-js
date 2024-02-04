import { ArgumentsHost, BadRequestException, Catch, HttpException, NotFoundException } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";

@Catch(BadRequestException, NotFoundException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: BadRequestException | NotFoundException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    const wsException = new WsException(exception.getResponse());
    this.handleError(client, wsException);
  }

  handleError(client, exception) {
    const status = 'error';
    const message = exception.getError();
    client.emit('exception', { status, message });
  }
}