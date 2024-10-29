import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  stock: boolean;

  @IsString()
  @IsNotEmpty()
  imgUrl: string;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNumber()
  price?: number;

  @IsBoolean()
  stock?: boolean;

  @IsString()
  @IsNotEmpty()
  imgUrl?: string;
}
