import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "src/modules/roles/entities/role.entity";
import { RolePermissions } from "src/modules/roles/entities/rolesPermissions";
const { v4: uuidv4 } = require('uuid');

@Table({
    paranoid: true
})
export class Permission extends Model <Permission>{
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        defaultValue: uuidv4,
        type: DataType.UUID,
        allowNull: false,
        unique: true
    })
    permissionId: string

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
    name: string

    @BelongsToMany(() => Role, () => RolePermissions)
    roles: Role[];

    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: null
    })
    deletedAt: Date

    
}
