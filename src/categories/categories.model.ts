import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'categories'})

export class Categories extends Model<Categories>{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    category_name: string
}