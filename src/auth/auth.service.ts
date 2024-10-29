import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/createUserDto';
import { User } from '../users/users.entity';
import { Test, TestingModule } from '@nestjs/testing';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  

  async signUp(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { password, confirmPassword, ...rest } = createUserDto;

    if (password !== confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario con la contraseña hasheada
    const newUser = await this.usersService.create({
      ...rest,
      password: hashedPassword,
      admin: false, // Por defecto, los nuevos usuarios no son administradores
    });

    const { password: _, ...result } = newUser;
    return result;
  }

  async signIn(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generar el token JWT con el rol
    const payload = { email: user.email, sub: user.id, admin: user.admin };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    return { accessToken };
  }
  



}