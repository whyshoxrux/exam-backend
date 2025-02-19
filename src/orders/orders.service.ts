import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Orders } from './orders.model';
import { User } from 'src/users/users.model';
import { Shipping } from 'src/shipping/shipping.model';
import { Payments } from 'src/payments/payment.model';
import { Products } from 'src/products/products.model';
import { OrderItems } from 'src/order_items/order_items.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders) private orderModel: typeof Orders) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto as any);
  }

  async createMany(createOrderDto: CreateOrderDto[]) {
    return this.orderModel.bulkCreate(createOrderDto as any);
  }

  async getMine(orderId: number) {
    const order = await this.orderModel.findOne({
      where: { id: orderId },
      include: [
        { model: User },
        { model: Shipping },
        { model: Payments },
        { model: OrderItems },
      ],
    });
    return order
  }

  findAll() {
    return this.orderModel.findAll({
      include: [
        { model: User },
        { model: Shipping },
        { model: Payments },
        { model: OrderItems },
      ],
    });
  }

  async findOne(id: number) {
    const order = await this.orderModel.findByPk(id, {
      include: [
        { model: User },
        { model: Shipping },
        { model: Payments },
        { model: OrderItems },
      ],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<boolean> {
    try {
      const [affectedCount] = await this.orderModel.update(
        updateOrderDto as any,
        {
          where: { id },
        },
      );

      return affectedCount > 0;
    } catch (error) {
      console.error('Error updating order:', error);
      throw new Error('Failed to update order');
    }
  }

  remove(id: number) {
    return this.orderModel.destroy({ where: { id } });
  }
}
