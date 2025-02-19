import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './products.model';
import { ConfigService } from 'src/common/config/config.service';
import { Categories } from 'src/categories/categories.model';
import { Orders } from 'src/orders/orders.model';
import { Cart } from 'src/cart/cart.model';
import { Reviews } from 'src/reviews/reviews.model';
import { OrderItems } from 'src/order_items/order_items.model';
import { CartItem } from 'src/cart-item/cartItem.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products) private productsModel: typeof Products,
    private configService: ConfigService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productsModel.create(createProductDto as any);
  }

  async createMany(createProductDto: CreateProductDto[]) {
    return await this.productsModel.bulkCreate(createProductDto as any);
  }

  async getMine(id: any) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('Yaroqli ID kiriting');
    }
    return this.productsModel.findByPk(id, {
      include: [
        { model: Categories },
        { model: OrderItems },
        { model: CartItem },
        { model: Reviews },
      ],
    });
  }

  findAll() {
    return this.productsModel.findAll({
      include: [
        { model: Categories },
        { model: OrderItems },
        { model: CartItem },
        { model: Reviews },
      ],
    });
  }

  findOne(id: number) {
    return this.productsModel.findByPk(id, {
      include: [
        { model: Categories },
        { model: OrderItems },
        { model: CartItem },
        { model: Reviews },
      ],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const [updated] = await this.productsModel.update(updateProductDto as any, {
      where: { id },
    });

    if (updated) {
      return this.productsModel.findByPk(id);
    }
    return null;
  }

  remove(id: number) {
    return this.productsModel.destroy({ where: { id } });
  }
}
