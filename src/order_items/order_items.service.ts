import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItems } from './order_items.model';
import { Orders } from 'src/orders/orders.model';
import { Products } from 'src/products/products.model';

@Injectable()
export class OrderItemsService {
  constructor(@InjectModel(OrderItems) private orderItems: typeof OrderItems) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    return this.orderItems.create(createOrderItemDto);
  }

  createMany(createOrderItemDto: CreateOrderItemDto[]) {
    return this.orderItems.bulkCreate(createOrderItemDto);
  }

  findAll() {
    return this.orderItems.findAll({
      include: [{ model: Orders }, { model: Products }],
    });
  }

  async findOne(id: number) {
    return await this.orderItems.findByPk(id, {
      include: [{ model: Orders }, { model: Products }],
    });
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    await this.orderItems.update(updateOrderItemDto, {
      where: { id },
    });
    return this.orderItems.findByPk(id);
  }

  async remove(id: number) {
    const deleted = await this.orderItems.destroy({ where: { id } });
    return deleted === 1;
  }
}
