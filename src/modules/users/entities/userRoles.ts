import { Table, Model, ForeignKey, DataType, Column } from 'sequelize-typescript';
import { User } from './user.entity';
import { Role } from '../../roles/entities/role.entity';
const { v4: uuidv4 } = require('uuid');

@Table(
    {
        paranoid: true
    }
)
export class UserRoles extends Model<UserRoles> {
  @ForeignKey(() => User)
  @Column({
    defaultValue: uuidv4,
    type: DataType.UUID,
    allowNull: false,
    unique: true
})
  userId: string;

  @ForeignKey(() => Role)
  @Column({
    defaultValue: uuidv4,
    type: DataType.UUID,
    allowNull: false,
    unique: true
})
  roleId: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null
})
deletedAt: Date
}