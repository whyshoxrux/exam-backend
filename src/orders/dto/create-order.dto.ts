import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number

    @IsString()
    @IsNotEmpty()
    condition: string

    @IsNumber()
    @IsNotEmpty()
    order_count: number
}
