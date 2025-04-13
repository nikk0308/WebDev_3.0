import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from './venue.entity';
import { AvailableSlot } from './available-slot.entity';
import { CreateVenueDto } from './dto/create-venue.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    @InjectRepository(AvailableSlot)
    private readonly slotRepository: Repository<AvailableSlot>,
  ) {}

  private readonly logger = new Logger(VenueService.name);

  async create(createVenueDto: CreateVenueDto): Promise<Venue> {
    const venue = this.venueRepository.create(createVenueDto);
    if (!venue) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Не вдалося створити майданчик',
      });
    }
    return await this.venueRepository.save(venue);
  }

  findAll(): Promise<Venue[]> {
    return this.venueRepository.find();
  }

  async findSlots(id: string): Promise<AvailableSlot[]> {
    const venue = await this.venueRepository.findOneBy({ id });
    if (!venue) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Майданчик не знайдено',
      });
    }
    return this.slotRepository.find({ where: { venue: { id } } });
  }

  async findVenueById(id: string): Promise<Venue | null> {
    return this.venueRepository.findOneBy({ id });
  }

  public hello(text : string){
    return 'Venue service in venue-service response: ' + text;
  }
}