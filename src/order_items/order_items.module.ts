import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { OrderItemsController } from './order_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItems } from './order_items.model';
import { Orders } from 'src/orders/orders.model';
import { Products } from 'src/products/products.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderItems, Orders, Products])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
