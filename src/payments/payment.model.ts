import {
    BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Orders } from 'src/orders/orders.model';

@Table({ tableName: 'payments' })
export class Payments extends Model<Payments> {
  @ForeignKey(() => Orders)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id: number;

  @Column({
    type: DataType.ENUM('credit_card', 'paypal', 'bank_transfer'),
    allowNull: false,
  })
  payment_method: string;

  @Column({
    type: DataType.ENUM('pending', 'completed', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  })
  payment_status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @BelongsTo(() => Orders)
  order: Orders
}
