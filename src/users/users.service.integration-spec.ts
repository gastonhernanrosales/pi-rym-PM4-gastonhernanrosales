// users.service.integration-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

describe('UsersService Integration', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Usa un repositorio real o un mock
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
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

      jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

      const result = await usersService.create({
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
        address: newUser.address,
        phone: newUser.phone,
      });

      expect(result).toEqual(newUser);
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

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await usersService.findByEmail('test@example.com');

      expect(result).toEqual(user);
    });
  });
});
