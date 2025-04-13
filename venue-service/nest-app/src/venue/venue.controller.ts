import { Logger, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';

@Controller()
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  private readonly logger = new Logger(VenueController.name);

  @MessagePattern('create')
  async create(@Payload() createVenueDto: CreateVenueDto) {
    this.logger.log(`Received create request: ${JSON.stringify(createVenueDto)}`);
    return this.venueService.create(createVenueDto);
  }

  @MessagePattern('findAll')
  findAll() {
    this.logger.log(`Received findAll request`);
    return this.venueService.findAll();
  }

  @MessagePattern('findSlots')
  findSlots(@Payload() id: string) {
    this.logger.log(`Received findSlots request: ${JSON.stringify(id)}`);
    return this.venueService.findSlots(id);
  }

  @MessagePattern('find_venue_by_id')
  public async findVenueById(@Payload() data: { id: string }) {
    this.logger.log(`Received find_venue_by_id request: ${JSON.stringify(data)}`);
    return this.venueService.findVenueById(data.id);
  }

  @MessagePattern('hello')
  public hello(text : string) {
    this.logger.log('text: ', text);
    const answer = this.venueService.hello(text);
    this.logger.log('answer: ', answer);
    return answer;
  }
}