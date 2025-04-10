import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VenueModule } from './venue/venue.module';

@Module({
  imports: [VenueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
