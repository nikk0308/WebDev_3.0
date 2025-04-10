import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';

@Module({
  imports: [
    ClientsModule.register([{
      name: "VENUE_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || "amqp://rabbitmq:5672" ],
        queue: 'venue-service',
        queueOptions: { durable: false }
      }
    }])
  ],
  controllers: [VenueController],
  providers: [VenueService],
  exports: [VenueService]
})
export class VenueModule {}