// auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/createUserDto';
import { User } from '../users/users.entity';

jest.mock('../users/users.service');  // Mocks UsersService completamente
jest.mock('@nestjs/jwt');  // Mocks JwtService completamente

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,  // Jest lo convierte en mock automático
        JwtService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('signUp', () => {
    it('debería registrar un usuario nuevo y devolver el usuario sin contraseña', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        name: 'Test User',
        address: 'Test Address',
        phone: '123456789',
      };

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const savedUser: User = {
        id: 1,
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
        address: createUserDto.address,
        phone: createUserDto.phone,
        admin: false,
      };

      usersService.create.mockResolvedValue(savedUser);

      const result = await authService.signUp(createUserDto);

      expect(usersService.create).toHaveBeenCalledWith({
        email: createUserDto.email,
        password: expect.any(String),
        name: createUserDto.name,
        address: createUserDto.address,
        phone: createUserDto.phone,
        admin: false,
      });

      expect(result).toEqual({
        id: savedUser.id,
        email: savedUser.email,
        name: savedUser.name,
        address: savedUser.address,
        phone: savedUser.phone,
      });
    });

    it('debería lanzar UnauthorizedException si las contraseñas no coinciden', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'differentPassword',
        name: 'Test User',
        address: 'Test Address',
        phone: '123456789',
      };

      await expect(authService.signUp(createUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('signIn', () => {
    it('debería devolver un token de acceso si las credenciales son correctas', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user: User = {
        id: 1,
        email,
        password: await bcrypt.hash(password, 10),
        name: 'Test User',
        address: 'Test Address',
        phone: '123456789',
        admin: false,
      };

      usersService.findByEmail.mockResolvedValue(user);
      jwtService.sign.mockReturnValue('mockAccessToken');

      const result = await authService.signIn(email, password);

      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: user.email,
        sub: user.id,
        admin: user.admin,
      });
      expect(result).toEqual({ accessToken: 'mockAccessToken' });
    });

    it('debería lanzar UnauthorizedException si las credenciales son incorrectas', async () => {
      const email = 'test@example.com';
      const password = 'wrongPassword';
      const user: User = {
        id: 1,
        email,
        password: await bcrypt.hash('correctPassword', 10),
        name: 'Test User',
        address: 'Test Address',
        phone: '123456789',
        admin: false,
      };

      usersService.findByEmail.mockResolvedValue(user);

      await expect(authService.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('debería lanzar UnauthorizedException si el usuario no existe', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(authService.signIn('nonexistent@example.com', 'password')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
