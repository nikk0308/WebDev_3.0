import { Injectable, NotFoundException, UnauthorizedException, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}


  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async login(loginDto: LoginUserDto): Promise<{ id: string; name: string }> {
    const user = await this.findUser(loginDto.email);
    if (!user) {
      throw new NotFoundException('Неправильний email або пароль');
    }
    return { id: user.id, name: user.name };
  }

  async findUser(email : string): Promise<User|null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async isCorrect(loginDto : LoginUserDto): Promise<boolean> {
    const user = await this.findUser(loginDto.email);
    return !(!user || user.password !== loginDto.password);
  }

  public hello(text : string){
    return 'hello my friend ' + text;
  }
}