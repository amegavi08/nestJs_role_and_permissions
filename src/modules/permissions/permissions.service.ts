import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as Util from '../../../utils/index'

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission) private permissionModel: typeof Permission
  ){}

  // Assigning Permissions to user
  async createPermissions(createPermissionDto: CreatePermissionDto) {
    try {
      
      const { name } = createPermissionDto;
      const permission = await Permission.create({ name }); 
      return Util.SuccessRespone('Permission created sucessfully')

    } catch (error) {
      console.log(error)
      return Util.handleGrpcTryCatchError(Util.getTryCatchMsg(error))
    }
  }

  // Get All Permissions
  async findAll() {
    try {

      const permission = await Permission.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      })
      return Util?.handleSuccessRespone(
        permission,
        'Permission Data retrieved successfully.',
      );

    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }
  }

  // Get a permission
 async findOne(permissionId: string) {
  try {
      
    const permission = await Permission.findOne({
      where: {
        permissionId
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    })

  } catch (error) {
    console.log(error)
    return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
  }

  }

  // Update a permission
  async update(permissionId: string, updatePermissionDto: UpdatePermissionDto) {
    try {
      
      const permission = await Permission.findOne({ 
        where: { 
          permissionId,
          } 
        });
      if (!permission) {
        return Util?.handleFailResponse('Permission data not found')
      }
      Object.assign(permission, updatePermissionDto)
      await permission.save()
      return Util?.handleSuccessRespone(permission, 'Permission data updated successfully')

    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }
  }

  // Remove a Permission
  async remove(permissionId: string) {
    try {

      const permission = await Permission.findOne({ 
        where: { 
          permissionId
        } 
      });
      if (!permission) {
        return Util?.handleFailResponse("Permission Data does not exist")
      }
      await permission.destroy()
      return Util?.handleSuccessRespone(Util?.SuccessRespone, "Permission Data deleted Successfully")
      
    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }
  }
}
