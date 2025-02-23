import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: ['http://localhost:3001', 'http://localhost:3002'], // Front va Dashboard domenlari
      credentials: true,
    })
  );

  await app.listen(3000);
}
bootstrap();
