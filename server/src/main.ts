import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // cors configuration
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,DELETE,POST',
    allowedHeaders: 'Content-Type,authorization',
  });
  await app.listen(8080);
}
bootstrap();
