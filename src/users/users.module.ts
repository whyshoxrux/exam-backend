import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { SharingModule } from 'src/common/sharing.module';
import { Orders } from 'src/orders/orders.model';
import { Cart } from 'src/cart/cart.model';
import { Reviews } from 'src/reviews/reviews.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Orders, Reviews, Cart]),
    SharingModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
