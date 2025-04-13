import { Controller, Post, Body, Get, Param, Delete, Logger } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  private readonly logger = new Logger(BookingService.name);

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get(':user_id')
  async findByUser(@Param('user_id') user_id: string) {
    return this.bookingService.findByUser(user_id);
  }

  @Delete(':bookingId')
  async cancel(@Param('bookingId') bookingId: string) {
    return this.bookingService.cancel(bookingId);
  }

  @Get('hello/hello')
  async hello() {
    this.logger.log(`Sending hello`);
    return this.bookingService.hello();
  }
}