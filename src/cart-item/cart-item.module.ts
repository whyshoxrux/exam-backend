import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './cartItem.model';
import { Cart } from 'src/cart/cart.model';
import { Products } from 'src/products/products.model';

@Module({
  imports: [SequelizeModule.forFeature([CartItem, Cart, Products])],
  controllers: [CartItemController],
  providers: [CartItemsService],
})
export class CartItemModule {}
