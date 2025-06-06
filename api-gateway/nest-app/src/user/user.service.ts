import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {

  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy,) {
  }

  private readonly logger = new Logger(UserService.name);

  private async send(pattern: any, data: any): Promise<any> {
    if (!pattern) {
      throw new Error('Pattern is undefined!');
    }

    this.logger.log(`Sending message: pattern=${JSON.stringify(pattern)}, data=${JSON.stringify(data)}`);

    const res$ = this.userClient.send(pattern, data).pipe(
      timeout(30000),
      catchError((e: Error) => {
        this.logger.error(`Error while sending message: ${e.message}`);
        return throwError(() => e);
      })
    );

    try {
      const result = await firstValueFrom(res$);
      if (result === undefined || result === null) {
        this.logger.warn(`Received empty response for pattern: ${pattern}`);
        return null;
      }
      return result;
    } catch (e) {
      if (e.message.includes('no elements in sequence')) {
        this.logger.warn(`No elements in sequence for pattern: ${pattern}`);
        return null;
      }
      throw e;
    }
  }

  public async register(createUserDto: CreateUserDto) {
    return this.send('register', createUserDto);
  }

  public async login(loginDto: LoginUserDto) {
    return this.send('login', loginDto);
  }

  public async hello(){
    return this.send('hello', 'hello');
  }
}