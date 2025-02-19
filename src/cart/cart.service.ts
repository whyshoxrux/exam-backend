import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { User } from 'src/users/users.model';
import { CartItem } from 'src/cart-item/cartItem.model';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartModel: typeof Cart) {}

  create(createCartDto: CreateCartDto) {
    return this.cartModel.create(createCartDto);
  }

  createMany(createCartDto: CreateCartDto[]) {
    return this.cartModel.bulkCreate(createCartDto);
  }

  findAll() {
    return this.cartModel.findAll({
      include: [{ model: User }, { model: CartItem }],
    });
  }

  findOne(id: number) {
    return this.cartModel.findByPk(id, {
      include: [{ model: User }, { model: CartItem }],
    });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.cartModel.update(updateCartDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.cartModel.destroy({ where: { id } });
  }
}
