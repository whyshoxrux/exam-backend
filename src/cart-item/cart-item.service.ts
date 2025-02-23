import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './cartItem.model';
import { Cart } from 'src/cart/cart.model';
import { Products } from 'src/products/products.model';

@Injectable()
export class CartItemsService {
  constructor(@InjectModel(CartItem) private cartItemModel: typeof CartItem) {}

  create(createCartItemDto: CreateCartItemDto) {
    return this.cartItemModel.create(createCartItemDto);
  }

  createMany(createCartItemDto: CreateCartItemDto[]) {
    return this.cartItemModel.bulkCreate(createCartItemDto);
  }

  async getMine(cartItemId: number) {
    const cartItems = await this.cartItemModel.findOne({
      where: { id: cartItemId },
      include: [{ model: Cart }, { model: Products }],
    });

    return cartItems;
  }

  findAll() {
    return this.cartItemModel.findAll({
      include: [{ model: Cart }, { model: Products }],
    });
  }

  findOne(id: number) {
    return this.cartItemModel.findByPk(id, {
      include: [{ model: Cart }, { model: Products }],
    });
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemModel.update(updateCartItemDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.cartItemModel.destroy({ where: { id } });
  }
}
