// src/orders/dto/create-order.dto.ts
import { IsUUID, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
