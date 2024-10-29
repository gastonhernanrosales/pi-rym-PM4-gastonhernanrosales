import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(new LoggerMiddleware().use);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma automáticamente los objetos DTO
      whitelist: true, // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Devuelve error si se envían propiedades no permitidas
      forbidUnknownValues: true, // Devuelve error si se envían valores no permitidos
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Documentación API de E-commerce')
    .setDescription('API para gestionar usuarios, productos y órdenes en la tienda en línea')
    .setVersion('1.0')
    .addBearerAuth() // Para añadir autenticación por token JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('API', app, document);
  await app.listen(3000);
}
bootstrap();
