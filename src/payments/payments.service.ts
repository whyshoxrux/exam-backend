import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payments } from './payment.model';
import { ConfigService } from 'src/common/config/config.service';
import { Orders } from 'src/orders/orders.model';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payments) private paymentModel: typeof Payments,
    private configService: ConfigService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return await this.paymentModel.create(createPaymentDto);
  }

  async createMany(createPaymentDto: CreatePaymentDto[]) {
    return await this.paymentModel.bulkCreate(createPaymentDto);
  }

  async getMine(userId: number) {
    const user = await this.paymentModel.findOne({
      where: { id: userId },
      include: { model: Orders },
    });
  }

  findAll() {
    return this.paymentModel.findAll({ include: { model: Orders } });
  }

  findOne(id: number) {
    return this.paymentModel.findByPk(id, { include: { model: Orders } });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const [updated] = await this.paymentModel.update(updatePaymentDto, {
      where: { id },
    });
    if (updated) {
      return this.paymentModel.findByPk(id);
    }
    return null;
  }

  async remove(id: number) {
    const deleted = await this.paymentModel.destroy({ where: { id } });
    return deleted === 1;
  }
}
