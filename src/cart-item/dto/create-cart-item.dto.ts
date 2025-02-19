import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartItemDto {
    @IsNumber()
    @IsNotEmpty()
    cart_id: number

    @IsNumber()
    @IsNotEmpty()
    product_id: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number

}
