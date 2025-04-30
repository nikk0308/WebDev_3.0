import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';

@Controller('venues')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  private readonly logger = new Logger(VenueService.name);

  @Post()
  async create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @Get()
  findAll() {
    return this.venueService.findAll();
  }

  @Get(':id/slots')
  findSlots(@Param('id') id: string) {
    this.logger.warn(`Received request with id: ${id}`);
    return this.venueService.findSlots(id);
  }

  @Get('hello/hello')
  async hello() {
    return this.venueService.hello();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.venueService.findById(id);
  }
}
