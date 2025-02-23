import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: ['http://localhost:3001', 'http://localhost:3002'],
      credentials: true,
    }),
  );

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}

bootstrap();
