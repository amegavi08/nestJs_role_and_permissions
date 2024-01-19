import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "src/modules/roles/entities/role.entity";
// import { UserRoles } from "./userRoles";
const { v4: uuidv4 } = require('uuid');

@Table({
    paranoid: true
})
export class User extends Model<User>{
    @Column({
        defaultValue: uuidv4,
        type: DataType.UUID,
        allowNull: false,
        unique: true
    })
    userId: string

    // @ForeignKey(() => Role)
    // @Column({
    //     defaultValue: uuidv4,
    //     type: DataType.STRING,
    //     allowNull: false,
    //     unique: true,
    //     references: {
    //         model: {
    //             tableName: 'Roles',
    //         },
    //         key: 'roleId',
    //     },
    //     onDelete: 'CASCADE',
    // })
    // roleId: string
    // @BelongsTo(() => Role)
    // role: Role

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

    // @BelongsToMany(() => Role, () => UserRoles)
    // roles: Role[];

    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: null
    })
    deletedAt: Date
}
