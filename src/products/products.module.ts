import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from './products.model';
import { SharingModule } from 'src/common/sharing.module';
import { Cart } from 'src/cart/cart.model';
import { Orders } from 'src/orders/orders.model';
import { Reviews } from 'src/reviews/reviews.model';
import { OrderItems } from 'src/order_items/order_items.model';
import { CartItem } from 'src/cart-item/cartItem.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Products, OrderItems, CartItem]),
    SharingModule,
    Reviews,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
