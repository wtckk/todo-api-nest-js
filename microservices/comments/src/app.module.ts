import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comments/comments.entity";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Comment],
      synchronize: true,
      autoLoadEntities: true,
      logging: ["query", "error"],
    }),
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
