import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as Util from '../../../utils/index'
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/decorators/public.decorators';
import { AtGuard } from 'src/guards/at.guard';

@ApiTags('Role')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Creating Roles
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
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

  // Get all Roles
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Get('allRoles')
  async findAll() {
    let ErrorCode: number
    try {

      let role = await this.rolesService?.findAll();
      if (role?.status_code != HttpStatus.OK) {
        ErrorCode = role?.status_code;
        throw new Error(role?.message);
      }
      return role;

    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
    }
  }

 // Get a Role
 @UseGuards(AuthGuard('jwt'))
 @ApiBearerAuth('defaultBearerAuth')
 @Public()
 @UseGuards(AtGuard)
 @Get(':roleId')
 async findOne(
   @Param('roleId') roleId: string
 ) {
   let ErrorCode: number;
   try {

     let role = await this.rolesService.findOne(roleId);
     if (role?.status_code != HttpStatus.OK) {
       ErrorCode = role?.status_code;
       throw new Error(role?.message)
     }
     return role;

   } catch (error) {
     console.log(error)
     return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
   }
 }

 // Update a Role
 @UseGuards(AuthGuard('jwt'))
 @ApiBearerAuth('defaultBearerAuth')
 @Public()
 @UseGuards(AtGuard)
  @Patch(':roleId')
  async update(
    @Param('roleId') roleId: string,
    @Body() updateRoleDto: UpdateRoleDto) 
    {
      let ErrorCode: number
      try {
        const role = await this.rolesService.update(roleId,updateRoleDto)
        if (role?.status_code != HttpStatus.OK) {
          ErrorCode = role?.status_code;
          throw new Error(role?.message)
        }
        return role
      } catch (error) {
        console.log(error);
        return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
      }
  }

  // Delete Role
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Delete(':roleId')
  async remove(@Param('roleId') roleId: string) {
    let ErrorCode: number
    try {
      const role = await this.rolesService.remove(roleId)
      if (role?.status_code != HttpStatus.OK) {
        ErrorCode = role?.status_code;
        throw new Error(role?.message)
      }
      if (!role) {
        return Util?.handleFailResponse('Role does not exist')
      } else {
        return role
      }
    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
    }
  }
}
