import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {
  }

  private readonly logger = new Logger(BookingController.name);

  @MessagePattern('create_booking')
  async create(@Payload() createBookingDto: CreateBookingDto) {
    this.logger.log(`Received create booking request: ${JSON.stringify(createBookingDto)}`);
    return this.bookingService.create(createBookingDto);
  }

  @MessagePattern('find_bookings_by_user')
  async findByUser(@Payload() data: { user_id: string }) {
    this.logger.log(`Received find bookings by user request: ${JSON.stringify(data)}`);
    return this.bookingService.findByUser(data.user_id);
  }

  @MessagePattern('cancel_booking')
  async cancel(@Payload() data: { bookingId: string }) {
    this.logger.log(`Received cancel booking request: ${JSON.stringify(data)}`);
    return this.bookingService.cancel(data.bookingId);
  }

  @MessagePattern('hello')
  public hello(text : string) {
    this.logger.log('text: ', text);
    const answer = this.bookingService.hello(text);
    this.logger.log('answer: ', answer);
    return answer;
  }
}