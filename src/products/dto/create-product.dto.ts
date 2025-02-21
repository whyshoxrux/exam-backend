import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsString()
  @IsNotEmpty()
  product_image: string;

  @IsNumber()
  @IsNotEmpty()
  cart_id: number;

  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
