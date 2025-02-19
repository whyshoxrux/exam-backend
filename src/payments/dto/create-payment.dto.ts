import {  IsNotEmpty, IsNumber, IsString,} from "class-validator";

export class CreatePaymentDto {
    @IsNumber()
    @IsNotEmpty()
    order_id: number


    @IsString()
    @IsNotEmpty()
    payment_method: string

    @IsString()
    @IsNotEmpty()
    payment_status: string

    @IsNumber()
    @IsNotEmpty()
    amount: number
}
