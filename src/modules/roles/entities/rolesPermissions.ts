import { Model, ForeignKey, Table, Column, DataType, BelongsTo } from 'sequelize-typescript';
import { Role } from './role.entity';
import { Permission } from '../../permissions/entities/permission.entity';
const { v4: uuidv4 } = require('uuid');

@Table(
    {
        paranoid: true
    }
)
export class RolePermissions extends Model<RolePermissions> {
  @ForeignKey(() => Role)
  @Column({
    defaultValue: uuidv4,
    type: DataType.UUID,
    allowNull: false,
    unique: true
})
  roleId: string;

  @ForeignKey(() => Permission)
  @Column({
    defaultValue: uuidv4,
    type: DataType.UUID,
    allowNull: false,
    unique: true
})
  permissionId: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null
})
deletedAt: Date

}