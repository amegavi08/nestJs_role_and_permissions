import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import * as Util from '../../../utils/index'

@ApiTags('Role')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    let ErrorCode: number
    try {
      
      let role = await this.rolesService.createRole(createRoleDto);

      if (role && 'status_code' in role && role.status_code !== HttpStatus.OK) {
        ErrorCode = role?.status_code;
        throw new Error(role?.message);
      }

      return role
    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode);
    }
  }

  // Assigning Permissions
  @Post(':roleId/assign-role/:permissionId')
  async assignPermission(
    @Param('roleId') roleId: string, @Param('permissionId') permissionId: string
  ) {
    let ErrorCode: number;
    try {
      
      let rolePermission = await this?.rolesService.assignPermissionToRole(roleId,permissionId);
      
      if (rolePermission?.status_code != HttpStatus.OK) {
        ErrorCode = rolePermission?.status_code;
        throw new Error(rolePermission?.message);
      }
      return rolePermission
    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode);
    }
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
