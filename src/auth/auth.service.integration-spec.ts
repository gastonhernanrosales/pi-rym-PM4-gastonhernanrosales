// users.service.integration-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entidades/user.entity';
import { Repository } from 'typeorm';

describe('UsersService Integration', () => {
  let usersService: UsersService;

  const mockUserRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear un nuevo usuario en la base de datos', async () => {
      const newUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
        address: 'Test Address',
        phone: '123456789',
        admin: false,
      };

      mockUserRepository.save.mockResolvedValue(newUser);

      const result = await usersService.create({
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
        address: newUser.address,
        phone: newUser.phone,
      });

      expect(result).toEqual(newUser);
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByEmail', () => {
    it('debería devolver un usuario según el email', async () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
        address: 'Test Address',
        phone: '123456789',
        admin: false,
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await usersService.findByEmail('test@example.com');

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});

