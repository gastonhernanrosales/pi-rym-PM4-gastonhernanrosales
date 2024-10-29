import { IsEmail, IsNotEmpty, IsString, IsOptional, IsPhoneNumber, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
    @Length(8, 15)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    })
    password: string;

    @IsNotEmpty()
    @Length(8, 15)
    confirmPassword: string; // Confirmación de contraseña


  @IsNotEmpty()
  @IsString()
  address: string;

  @IsPhoneNumber(null) // Cambia null por el código de país si es necesario
  phone: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;
}
