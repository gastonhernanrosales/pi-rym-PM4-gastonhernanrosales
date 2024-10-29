import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUserDto';
import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'password123', description: 'Nueva contraseña del usuario', required: false })
  @IsString()
  @IsOptional()
  @Length(8, 20)
  password?: string;

  @ApiProperty({ example: 'Calle Falsa 123', description: 'Nueva dirección del usuario', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: '123456789', description: 'Nuevo teléfono del usuario', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Argentina', description: 'Nuevo país del usuario', required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: 'Buenos Aires', description: 'Nueva ciudad del usuario', required: false })
  @IsString()
  @IsOptional()
  city?: string;
}
