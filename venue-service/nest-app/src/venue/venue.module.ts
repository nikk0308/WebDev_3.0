import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';
import { Venue } from './venue.entity';
import { AvailableSlot } from './available-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venue, AvailableSlot])],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}