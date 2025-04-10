import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [UserModule, OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
