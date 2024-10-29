import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './user.Repository';
import { RolesGuard } from 'src/auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [UsersController],
  providers: [UsersService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },UsersRepository]
})
export class UsersModule {}
