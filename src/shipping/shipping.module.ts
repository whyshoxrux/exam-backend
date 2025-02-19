import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shipping } from './shipping.model';
import { Orders } from 'src/orders/orders.model';

@Module({
  imports: [SequelizeModule.forFeature([Shipping, Orders])],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
