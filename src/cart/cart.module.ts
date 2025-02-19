import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { User } from 'src/users/users.model';
import { CartItem } from 'src/cart-item/cartItem.model';

@Module({
  imports: [SequelizeModule.forFeature([Cart]), User, CartItem],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
