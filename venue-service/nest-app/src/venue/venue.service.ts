import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from './venue.entity';
import { AvailableSlot } from './available-slot.entity';
import { CreateVenueDto } from './dto/create-venue.dto';

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
    return await this.venueRepository.save(venue);
  }

  findAll(): Promise<Venue[]> {
    return this.venueRepository.find();
  }

  async findSlots(id: string): Promise<AvailableSlot[]> {
    this.logger.log(`Processing findSlots request: ${JSON.stringify(id)}`);
    const venue = await this.venueRepository.findOneBy({ id });
    this.logger.log(`Found venue findSlots request: ${JSON.stringify(venue)}`);
    if (!venue) {
      throw new NotFoundException('Майданчик не знайдено');
    }
    this.logger.log(`Slots amount: ${JSON.stringify(this.slotRepository.count())}`);
    return this.slotRepository.find({ where: { venue: { id } } });
  }

  public hello(text : string){
    return 'hello from venue ' + text;
  }
}