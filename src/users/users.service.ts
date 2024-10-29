import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './user.Repository';
import { UpdateUserDto } from './update-user.dto';
import { CreateUserDto } from './createUserDto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  async getUsers(): Promise<Omit<User, 'password'>[]> {
    return this.usersRepository.findAll();
  }

  async getUserById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado.`);
    }
    return user;
  }

  
  async findByName(name: string): Promise<User> {
    const user = await this.usersRepository.findByName(name);
    if (!user) {
      throw new NotFoundException(`Usuario con nombre ${name} no encontrado.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findByEmail(email);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    const updatedId = await this.usersRepository.update(id, updateUserDto);
    if (!updatedId) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return updatedId;
  }

  async removeUser(id: number): Promise<number> {
    const removedId = await this.usersRepository.remove(id);
    if (!removedId) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return removedId;
  }
}
