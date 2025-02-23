import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartItem } from 'src/cart-item/cartItem.model';
import { Cart } from 'src/cart/cart.model';
import { Categories } from 'src/categories/categories.model';
import { OrderItems } from 'src/order_items/order_items.model';
import { Orders } from 'src/orders/orders.model';
import { Reviews } from 'src/reviews/reviews.model';

@Table({ tableName: 'products' })
export class Products extends Model<Products> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  product_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '/uploads/default_product.jpg'
  })
  product_image: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Categories)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;

  @BelongsTo(() => Categories)
  category: Categories;

  @HasMany(() => Reviews)
  reviews: Reviews[];

  @HasMany(() => CartItem)
  cartItem: CartItem;

  @HasMany(() => OrderItems)
  orderItems: OrderItems;
}
