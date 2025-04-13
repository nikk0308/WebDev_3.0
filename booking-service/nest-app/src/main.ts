import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { GlobalRpcExceptionFilter } from './global-rpc-exception.filter';
const pack = require('./../package.json');

async function bootstrap() {

  console.log(pack.name)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL as string],
        queue: pack.name,
        queueOptions: { durable: false },
      }
    },
  );

  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  await app.listen();

}
bootstrap();