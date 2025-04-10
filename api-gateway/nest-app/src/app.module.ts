import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VenueModule } from './venue/venue.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [UserModule, VenueModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
