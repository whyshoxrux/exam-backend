import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharingModule } from './common/sharing.module';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { ShippingModule } from './shipping/shipping.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host:  process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadModels: true,
      synchronize: true,
      // sync: { force: true },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    SharingModule,
    ProductsModule,
    PaymentsModule,
    OrdersModule,
    OrderItemsModule,
    ShippingModule,
    CategoriesModule,
    CartModule,
    CartItemModule,
    ReviewsModule,
  ],
})
export class AppModule {}
