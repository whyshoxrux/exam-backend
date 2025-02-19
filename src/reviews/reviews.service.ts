import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reviews } from './reviews.model';
import { User } from 'src/users/users.model';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Reviews) private reviewModel: typeof Reviews) {}

  create(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create(createReviewDto);
  }

  createMany(createReviewDto: CreateReviewDto[]) {
    return this.reviewModel.bulkCreate(createReviewDto);
  }

  findAll() {
    return this.reviewModel.findAll({ include: { model: User } });
  }

  findOne(id: number) {
    return this.reviewModel.findByPk(id, { include: { model: User } });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.reviewModel.update(updateReviewDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.reviewModel.destroy({ where: { id } });
  }
}
