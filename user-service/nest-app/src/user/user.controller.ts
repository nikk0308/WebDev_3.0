import { Logger, Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  private readonly logger = new Logger(UserController.name);

  @MessagePattern('register')
  public async register(@Payload() createUserDto: CreateUserDto) {
    this.logger.log(`Received registration request: ${JSON.stringify(createUserDto)}`);
    return this.userService.register(createUserDto);
  }

  @MessagePattern('login')
  public async login(@Payload() loginUserDto: LoginUserDto) {
    this.logger.log(`Received login request: ${JSON.stringify(loginUserDto)}`);
    return this.userService.login(loginUserDto);
  }

  @MessagePattern('hello')
  public hello(text : string) {
    this.logger.log('text: ', text);
    const answer = this.userService.hello(text);
    this.logger.log('answer: ', answer);
    return answer;
  }
}