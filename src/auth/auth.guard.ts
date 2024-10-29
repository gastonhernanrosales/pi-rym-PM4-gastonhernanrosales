import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verificar el token JWT
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      request.user = payload; // Adjuntar el payload del token a la solicitud
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true; // Permitir el acceso si el token es válido
  }
}



