import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/ormconfig';


@Global() // Hace que el módulo sea accesible en toda la aplicación
@Module({
  imports: [TypeOrmModule.forRoot(config)],
})
export class DatabaseModule {}
