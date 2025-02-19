import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { OrderItems } from 'src/order_items/order_items.model';
import { Payments } from 'src/payments/payment.model';
import { Products } from 'src/products/products.model';
import { Shipping } from 'src/shipping/shipping.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'orders' })
export class Orders extends Model<Orders> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  })
  condition: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_count: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Shipping)
  shippings: Shipping[];

  @HasMany(() => Payments)
  payments: Payments[];

  @HasMany(() => OrderItems)
  orderItems: OrderItems[]
}
