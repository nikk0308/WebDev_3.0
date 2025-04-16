import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RpcException } from '@nestjs/microservices';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(userRepository, 'create').mockReturnValue(createUserDto as User);
      jest.spyOn(userRepository, 'save').mockResolvedValue({ ...createUserDto, id: '1' });

      const result = await userService.register(createUserDto);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(createUserDto.email);
    });

    it('should throw an error if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue({ id: '1', ...createUserDto } as User);

      await expect(userService.register(createUserDto)).rejects.toThrow(
        new RpcException({
          statusCode: 409,
          message: 'Користувач з таким email вже існує',
        }),
      );
    });
  });

  describe('login', () => {
    it('should login a user with correct credentials', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const mockUser = { id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as User);

      const result = await userService.login(loginUserDto);

      expect(result).toEqual({ id: '1', name: 'John Doe' });
    });

    it('should throw an error if user is not found or password is incorrect', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'john.doe@example.com',
        password: 'wrongpassword',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(userService.login(loginUserDto)).rejects.toThrow(
        new RpcException({
          statusCode: 404,
          message: 'Неправильний email або пароль',
        }),
      );
    });
  });

  describe('findUser', () => {
    it('should find a user by email', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as User);

      const result = await userService.findUser('john.doe@example.com');

      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const result = await userService.findUser('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findUserById', () => {
    it('should find a user by id', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as User);

      const result = await userService.findUserById('1');

      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const result = await userService.findUserById('nonexistent-id');

      expect(result).toBeNull();
    });
  });

  describe('hello', () => {
    it('should return a greeting message', () => {
      const result = userService.hello('world');

      expect(result).toBe('User service in user-service response: world');
    });
  });
});