import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './createUserDto';
import { User } from './users.entity';

@ApiTags('Usuarios') // Etiqueta para Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.', type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente.', type: [User] })
  @Get()
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return this.usersService.getUsers(); // Llama a `getUsers` en el servicio
  }

  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return user;
  }

  @ApiOperation({ summary: 'Obtener usuario por nombre' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get('name/:name')
  async getUserByName(@Param('name') name: string): Promise<Omit<User, 'password'>> {
    return this.usersService.findByName(name);
  }
}
