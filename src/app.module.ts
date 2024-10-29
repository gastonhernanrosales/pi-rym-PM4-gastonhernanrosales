import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/ormconfig';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  FilesModule,ProductsModule, FilesModule,ConfigModule.forRoot(),UsersModule, AuthModule,DatabaseModule,TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService,JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Registrar RolesGuard globalmente
    },],
})
export class AppModule {}
