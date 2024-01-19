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

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
