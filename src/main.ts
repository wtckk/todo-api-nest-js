import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipes";

async function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('To-do list')
    .setDescription('RESTful API для управления задачами')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/v1/docs', app, document)

  app.enableCors({
    origin: 'http://localhost:5000',
  });

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

start();
