import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { mockUserService } from './mocks/user.service.mock';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useValue: mockUserService,
    },
  ],
})
export class UserModule {}