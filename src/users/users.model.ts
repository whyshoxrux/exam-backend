import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { Cart } from 'src/cart/cart.model';
import { Orders } from 'src/orders/orders.model';
import { Reviews } from 'src/reviews/reviews.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  second_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '/uploads/default_image.png'
  })
  profile_image: string;

  @Column({
    type: DataType.ENUM('admin', 'user'),
    allowNull: false,
  })
  role: string;

  @HasMany(() => Orders)
  orders: Orders[];

  @HasMany(() => Cart)
  carts: Cart[];

  @HasMany(() => Reviews)
  reviews: Reviews[];
}
