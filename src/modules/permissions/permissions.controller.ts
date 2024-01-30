import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as Util from '../../../utils/index'
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/decorators/public.decorators';
import { AtGuard } from 'src/guards/at.guard';

@ApiTags('Permission')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // Creating permission
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    let ErrorCode: number;
    try {
      
      let permission = await this.permissionsService.createPermissions(createPermissionDto);
      if (permission?.status_code != HttpStatus.OK) {
        ErrorCode = permission?.status_code;
        throw new Error(permission?.message);
      }
      return permission

    } catch (error) {
      console.log(error)
      return Util.handleRequestError(Util.getTryCatchMsg(error), ErrorCode)
    }
  }

  // Get all Users
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Get('allPermissions')
  async findAll() {
    let ErrorCode: number
    try {

      let permission = await this.permissionsService?.findAll();
      if (permission?.status_code != HttpStatus.OK) {
        ErrorCode = permission?.status_code;
        throw new Error(permission?.message);
      }
      return permission;

    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
    }
  }

  // Get a Permission
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Get(':permissionId')
  async findOne(@Param('permissionId') permissionId: string) {
    let ErrorCode: number;
    try {

      let permission = await this.permissionsService.findOne(permissionId);
      if (permission?.status_code != HttpStatus.OK) {
        ErrorCode = permission?.status_code;
        throw new Error(permission?.message)
      }
      return permission;

    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
    }
  }

  // Update a Permission
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Patch(':permissionId')
  async update(
    @Param('permissionId') permissionId: string,
    @Body() updatePermissionDto: UpdatePermissionDto) 
    {
      let ErrorCode: number
      try {
        const permission = await this.permissionsService.update(permissionId,updatePermissionDto)
        if (permission?.status_code != HttpStatus.OK) {
          ErrorCode = permission?.status_code;
          throw new Error(permission?.message)
        }
        return permission
      } catch (error) {
        console.log(error);
        return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
      }
  }

  // Delete a Permission
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Delete(':id')
  async remove(@Param('permissionId') permissionId: string) {
    let ErrorCode: number
    try {
      const permission = await this.permissionsService.remove(permissionId)
      if (permission?.status_code != HttpStatus.OK) {
        ErrorCode = permission?.status_code;
        throw new Error(permission?.message)
      }
      if (!permission) {
        return Util?.handleFailResponse('Permission does not exist')
      } else {
        return permission
      }
    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
    }
  }
}
