import {
    BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Orders } from 'src/orders/orders.model';
import { Products } from 'src/products/products.model';

@Table({ tableName: 'order_items' })
export class OrderItems extends Model<OrderItems> {
  @ForeignKey(() => Orders)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id: number;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @BelongsTo(() => Products)
  product: Products[]

  @BelongsTo(() => Orders)
  orders: Orders[]
}
