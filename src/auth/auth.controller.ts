import { BadRequestException, Body, ConflictException, Controller,Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.DTO';
import { LoginUserDto } from './loginUserDTO';
import { CreateUserDto } from 'src/users/user.DTO';
import { User } from 'src/entidades/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Get()
  checkAuth() {
    return this.authService.checkAuth();
  }
  
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);  // Usar el servicio AuthService
  }
  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.signIn(loginUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
  @Post('signin')
  async signin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }
}
