import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepo.create(userData); // Inicializa sin guardar
    return this.userRepo.save(user); // Guarda el usuario inicializado
  }
  async findByName(name: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { name } });
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.userRepo.find({
      select: ['id', 'name', 'email', 'address', 'phone', 'country', 'city'],
    });
  }

  async findById(id: number): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(id: number, updatedUser: Partial<User>): Promise<number | undefined> {
    const result = await this.userRepo.update(id, updatedUser);
    return result.affected ? id : undefined;
  }

  async remove(id: number): Promise<number | undefined> {
    const result = await this.userRepo.delete(id);
    return result.affected ? id : undefined;
  }
}
