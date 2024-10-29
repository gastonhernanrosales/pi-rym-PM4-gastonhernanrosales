import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST, // por ejemplo 'localhost'
  port: parseInt(process.env.DB_PORT, 10) || 5432, // por defecto 5432
  username: process.env.DB_USER, // tu usuario de Postgres
  password: process.env.DB_PASSWORD, // tu contraseña de Postgres
  database: process.env.DB_NAME, // el nombre de tu base de datos
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // ruta a tus entidades
  synchronize: true, // ten cuidado con esto en producción
};

export default config;
