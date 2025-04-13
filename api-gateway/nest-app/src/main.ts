import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { GlobalExceptionFilter } from './global-exception.filter';

const pack = require('./../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.BROCKER_URI],
      queue: pack.name,
      queueOptions: { durable: false },
    },
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();