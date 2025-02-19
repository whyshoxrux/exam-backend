import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from './categories.model';

@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Categories) private categoryModel: typeof Categories) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  createMany(createCategoryDto: CreateCategoryDto[]) {
    return this.categoryModel.bulkCreate(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.findAll();
  }

  findOne(id: number) {
    return this.categoryModel.findByPk(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.categoryModel.destroy({ where: { id } });
  }
}
