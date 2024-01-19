import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import * as Util from '../../../utils/index'
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(Permission) private permissionModel: typeof Permission
  ){}
  async createRole(createRoleDto: CreateRoleDto) {

    try {
      
      const { name, permissions } = createRoleDto

      const role = await this.roleModel.create({ name });
  
      if (permissions && permissions.length > 0 ) {
        const  rolePermissions = await Permission.findAll({
          where: {
            name: permissions,
          },
        });
        await role.$add('permissions', rolePermissions);
      }
      return role

    } catch (error) {
      console.log(error)
      return Util.handleGrpcTryCatchError(Util.getTryCatchMsg(error))
    }

  }

  // Assigning permisions to roles
  async assignPermissionToRole(roleId: string, permissionId: string) {
    try {
      const role = await this.roleModel.findOne({
        where: {
          roleId
        }
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      const permisions = await this.permissionModel.findOne({
        where: {
          permissionId: permissionId
        }
      });

      if (!permisions) {
        throw new NotFoundException('Permission not found');
      }

      await role.$add('permission', permisions);

      return Util.SuccessRespone('Role assigned permission');
    } catch (error) {
      console.error(error);
      return Util.handleGrpcTryCatchError(Util.getTryCatchMsg(error));
    }
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
