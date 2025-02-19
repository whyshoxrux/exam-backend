import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Orders } from "src/orders/orders.model";

@Table({tableName: 'shipping'})

export class Shipping extends Model<Shipping>{
    
    @ForeignKey(() => Orders)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    order_id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    address: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    city: string

    @BelongsTo(() => Orders)
    order: Orders
}