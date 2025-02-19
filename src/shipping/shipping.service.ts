import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Shipping } from './shipping.model';
import { Orders } from 'src/orders/orders.model';

@Injectable()
export class ShippingService {
  constructor(@InjectModel(Shipping) private shippingModel: typeof Shipping) {}

  create(createShippingDto: CreateShippingDto) {
    return this.shippingModel.create(createShippingDto);
  }

  createMany(createShippingDto: CreateShippingDto[]) {
    return this.shippingModel.bulkCreate(createShippingDto);
  }

  findAll() {
    return this.shippingModel.findAll({ include: { model: Orders } });
  }

  findOne(id: number) {
    return this.shippingModel.findByPk(id, { include: { model: Orders } });
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return this.shippingModel.update(updateShippingDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.shippingModel.destroy({ where: { id } });
  }
}
