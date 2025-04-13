import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [BookingModule, OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
