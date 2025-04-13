import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {

  constructor(@Inject('BOOKING_SERVICE') private readonly bookingClient: ClientProxy,) {
  }

  private readonly logger = new Logger(BookingService.name);

  private async send(pattern: any, data: any): Promise<any> {
    if (!pattern) {
      throw new Error('Pattern is undefined!');
    }

    this.logger.log(`Sending message: pattern=${JSON.stringify(pattern)}, data=${JSON.stringify(data)}`);

    const res$ = this.bookingClient.send(pattern, data).pipe(
      timeout(30000),
      catchError((e: Error) => {
        this.logger.error(`Error while sending message: ${e.message}`);
        return throwError(() => e);
      })
    );

    try {
      const result = await firstValueFrom(res$);
      if (result === undefined || result === null) {
        this.logger.warn(`Received empty response for pattern: ${pattern}`);
        return null;
      }
      return result;
    } catch (e) {
      if (e.message.includes('no elements in sequence')) {
        this.logger.warn(`No elements in sequence for pattern: ${pattern}`);
        return null;
      }
      throw e;
    }
  }

  public async create(createBookingDto: CreateBookingDto) {
    return this.send('create_booking', createBookingDto);
  }

  public async findByUser(user_id: string) {
    return this.send('find_bookings_by_user', { user_id });
  }

  public async cancel(bookingId: string) {
    return this.send('cancel_booking', { bookingId });
  }


  public async hello(){
    return this.send('hello', 'hello');
  }
}
