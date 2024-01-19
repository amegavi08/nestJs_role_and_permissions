import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import * as Util from '../../../utils/index'
import { InjectModel } from '@nestjs/sequelize';
import { RolePermissions } from './entities/rolesPermissions';

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
          roleId:roleId
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

  // Get All Roles
  async findAll() {
    try {

      const role = await Role.findAll({
        attributes: { 
          exclude: ['createdAt', 'updatedAt', 'deletedAt'] 
        },
        include: [
          {
            model: Permission,
            attributes: {
              exclude: [
                'id',
                'updatedAt',
                'deletedAt'
              ],
            },
          }
        ]
      })
      return Util?.handleSuccessRespone(
        role,
        'Roles Data retrieved successfully.',
      );

    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }
  }

  // Get a Role
  async findOne(roleId: string) {
    
    try {
      
      const user = await Role.findOne({
        where: {
          roleId
        },
        attributes: {
           exclude: ['createdAt', 'updatedAt', 'deletedAt']
       },
       include: [
        {
          model: Permission,
          attributes: {
            exclude: [
              'id',
              'updatedAt',
              'deletedAt'
            ],
          },
        }
       ]
      })

    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }

  }

  // Update a Role
  async update(roleId: string, updateRoleDto: UpdateRoleDto) {
    try {
      
      const role = await Role.findOne({ 
        where: { 
          roleId,
          } 
        });
      if (!role) {
        return Util?.handleFailResponse('Role data not found')
      }
      Object.assign(role, updateRoleDto)
      await role.save()
      return Util?.handleSuccessRespone(role, 'Role data updated successfully')

    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }
  }

  // Delete a Role
  async remove(roleId: string) {
    try {

      const role = await Role.findOne({ 
        where: { 
          roleId
        } 
      });
      if (!role) {
        return Util?.handleFailResponse("Role Data does not exist")
      }
      await role.destroy()
      return Util?.handleSuccessRespone(Util?.SuccessRespone, "Role Data deleted Successfully")
      
    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }
  }
}
