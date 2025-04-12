import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}


  async register(createUserDto: { name: string; email: string; password: string }): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (existingUser) {
      throw new NotFoundException('Користувач з таким email вже існує');
    }
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async login(loginDto: { email: string; password: string }): Promise<{ id: string; name: string }> {
    const user = await this.usersRepository.findOneBy({ email: loginDto.email });
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Неправильний email або пароль');
    }
    return { id: user.id, name: user.name };
  }

  public hello(text : string){
    return 'hello my friend ' + text;
  }
}