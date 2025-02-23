import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reviews } from './reviews.model';
import { Products } from 'src/products/products.model';
import { User } from 'src/users/users.model';

@Module({
  imports: [SequelizeModule.forFeature([Reviews, Products, User])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
