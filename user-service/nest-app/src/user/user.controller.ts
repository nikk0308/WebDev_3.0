import { Logger, Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  private readonly logger = new Logger(UserController.name);

  @MessagePattern('hello')
  public hello(text : string) {
    this.logger.log('text: ', text);
    const answer = this.userService.hello(text);
    this.logger.log('answer: ', answer);
    return answer;
  }
}