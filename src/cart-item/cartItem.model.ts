import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Cart } from 'src/cart/cart.model';
import { Products } from 'src/products/products.model';

@Table({ tableName: 'CartItem' })
export class CartItem extends Model<CartItem> {
  
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cart_id: number;

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

  @BelongsTo(() => Cart)
  cart: Cart

  @BelongsTo(() => Products)
  product: Products
}
