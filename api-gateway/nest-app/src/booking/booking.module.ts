import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [
    ClientsModule.register([{
      name: "BOOKING_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || "amqp://rabbitmq:5672" ],
        queue: 'booking-service',
        queueOptions: { durable: false }
      }
    }])
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule {}