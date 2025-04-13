import { Inject, Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AvailableSlot } from './available-slot.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(AvailableSlot)
    private readonly slotRepository: Repository<AvailableSlot>,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('VENUE_SERVICE') private readonly venueServiceClient: ClientProxy,
  ) {}

  private readonly logger = new Logger(BookingService.name);

  async create(createBookingDto: CreateBookingDto) {
    this.logger.log(`Started creating in BookingService`);

    const user = await this.userServiceClient
      .send('find_user_by_id', { id: createBookingDto.user_id })
      .toPromise();
    if (!user) {
      throw new NotFoundException('Користувач не знайдений');
    }
    this.logger.log(`User passed in BookingService`);

    const venue = await this.venueServiceClient
      .send('find_venue_by_id', { id: createBookingDto.venue_id })
      .toPromise();
    if (!venue) {
      throw new NotFoundException('Стадіон не знайдений');
    }
    this.logger.log(`Venue passed in BookingService`);

    const slot = await this.slotRepository.findOne({
      where: {
        venue: { id: createBookingDto.venue_id },
        start_time: createBookingDto.start_time,
        end_time: createBookingDto.end_time,
      },
    });

    if (!slot) {
      throw new NotFoundException('Слот не знайдений');
    }

    if (slot.is_available === false) {
      throw new ConflictException('Слот вже зайнятий');
    }

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      user,
      venue,
    });
    this.logger.log(`Booking passed in BookingService`);

    slot.is_available = false;
    await this.slotRepository.save(slot);

    return this.bookingRepository.save(booking);
  }

  async findByUser(user_id: string) {
    return this.bookingRepository.find({ where: { user: { id: user_id } } });
  }

  async cancel(bookingId: string) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['venue'],
    });

    if (!booking) {
      throw new NotFoundException('Бронювання не знайдено');
    }

    const slot = await this.slotRepository.findOne({
      where: {
        venue: { id: booking.venue.id },
        start_time: booking.start_time,
        end_time: booking.end_time,
      },
    });

    if (!slot) {
      throw new NotFoundException('Слот для бронювання не знайдений');
    }

    slot.is_available = true;
    await this.slotRepository.save(slot);

    return this.bookingRepository.update(bookingId, { status: 'cancelled' });
  }

  public hello(text: string) {
    return 'hello my friend ' + text;
  }
}