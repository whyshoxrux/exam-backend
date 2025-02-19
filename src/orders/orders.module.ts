import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from './orders.model';
import { User } from 'src/users/users.model';
import { Shipping } from 'src/shipping/shipping.model';
import { Payments } from 'src/payments/payment.model';
import { OrderItems } from 'src/order_items/order_items.model';
import { Products } from 'src/products/products.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Orders, User, Shipping, Payments, OrderItems]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
