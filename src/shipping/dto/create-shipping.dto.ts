import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateShippingDto {
    @IsNumber()
    @IsNotEmpty()
    order_id: number

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    city: string
}
