import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TasksModule } from "../tasks/tasks.module";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    ClientsModule.register([
      {
        name: "COMMENTS",
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001
        }
      }
    ]),
    TasksModule
  ]
})
export class CommentsModule {}
