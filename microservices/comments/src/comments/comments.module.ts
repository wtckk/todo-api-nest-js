import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comments.entity";

@Module({
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController]

})
export class CommentsModule {
}
