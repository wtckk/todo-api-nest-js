import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { TaskCommentsService } from "./task-comments.service";
import { CreateTaskCommentDto } from "./dto/create.task-comment.dto";
import { ParseUUIDPipe, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { WsJwtGuard } from "./guard/ws-jwt.guard";
import { WsExceptionFilter } from "../filters/ws-exception.filter";

@UseGuards(WsJwtGuard)
@WebSocketGateway(3000, { namespace: 'comments' })
export class TaskCommentsGateway implements OnGatewayConnection {

  @WebSocketServer()
  server: Server

  constructor(private taskCommentsService: TaskCommentsService) {
  }

  handleConnection(client: Socket){
  }


  @SubscribeMessage('room_join')
  handleRoomJoin(client: Socket, taskId: string){
    client.join('')
  }

  @UseFilters(WsExceptionFilter)
  @SubscribeMessage('createComment')
  async create(@MessageBody(new ValidationPipe()) dto: CreateTaskCommentDto, @ConnectedSocket() client: Socket) {
    const comment= await this.taskCommentsService.create(dto, client.data.user.id)
    this.server.emit(`comment:${dto.taskId}`, comment)
  }

  @UseFilters(WsExceptionFilter)
  @SubscribeMessage('getComments')
  async getComments(@MessageBody() data: {taskId: string}, @ConnectedSocket() client: Socket){
    const comments = await this.taskCommentsService.findAllOfTask(data.taskId);
    client.emit(`comments:${data.taskId}`, comments);
  }

}

