import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VenueModule } from './venue/venue.module';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [VenueModule, OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
