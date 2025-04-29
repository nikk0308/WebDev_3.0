import { Injectable, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ id: string; name: string; email: string }> {
    const user = this.usersRepository.create(createUserDto);
    if (await this.findUser(createUserDto.email)) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Користувач з таким email вже існує',
      });
    }
    const savedUser = await this.usersRepository.save(user);
    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  async login(loginDto: LoginUserDto): Promise<{ id: string; name: string; email: string }> {
    const user = await this.findUser(loginDto.email);
    if (!user || user.password !== loginDto.password) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Неправильний email або пароль',
      });
    }
    return { id: user.id, name: user.name, email: user.email };
  }

  async findUser(email : string): Promise<User|null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  public hello(text : string){
    return 'User service in user-service response: ' + text;
  }
}