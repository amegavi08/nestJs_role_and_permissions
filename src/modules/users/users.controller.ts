import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as Util from '../../../utils/index'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from 'src/auth/loginDTO';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/decorators/public.decorators';
import { AtGuard } from 'src/guards/at.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Creating users
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Post('createUser')
  async createUser(
    @Body() createUserDto: CreateUserDto
  ) {
    let ErrorCode: number;
    try {

      let user = await this?.usersService.createUser(createUserDto);

      if (user?.status_code != HttpStatus.CREATED) {
        ErrorCode = user?.status_code;
        throw new Error(user?.message);
      }
      return user
    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode);
    }
  }

  // Assigning Roles
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Post(':userId/assign-role/:roleName')
  async assignRole(
    @Param('userId') userId: string, @Param('roleName') roleName: string
  ) {
    let ErrorCode: number;
    try {

      let userRole = await this?.usersService.assignRoleToUser(userId, roleName);

      if (userRole?.status_code != HttpStatus.CREATED) {
        ErrorCode = userRole?.status_code;
        throw new Error(userRole?.message);
      }
      return userRole
    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode);
    }
  }

  // Login User
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDTO) {

    let ErrorCode: number

    try {

      let userLogin = await this?.usersService.login(loginDto);
      if (userLogin?.status_code != HttpStatus.CREATED) {
        ErrorCode = userLogin?.status_code;
        throw new Error(userLogin?.message);
      }
      return userLogin;

    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
    }
  }

  // Get all Users
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Get('allUsers')
  async findAll() {
    let ErrorCode: number
    try {

      let allUsers = await this.usersService?.findAll();
      if (allUsers?.status_code != HttpStatus.OK) {
        ErrorCode = allUsers?.status_code;
        throw new Error(allUsers?.message);
      }
      return allUsers;

    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
    }
  }

  // Get a User
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Get(':userId')
  async findOne(
    @Param('userId') userId: string
  ) {
    let ErrorCode: number;
    try {

      let user = await this.usersService.findOne(userId);
      if (user?.status_code != HttpStatus.OK) {
        ErrorCode = user?.status_code;
        throw new Error(user?.message)
      }
      return user;

    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
    }
  }

  // Update a User
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    let ErrorCode: number
    try {
      const user = await this.usersService.update(userId,updateUserDto)
      if (user?.status_code != HttpStatus.OK) {
        ErrorCode = user?.status_code;
        throw new Error(user?.message)
      }
      return user
    } catch (error) {
      console.log(error);
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
    }
  }

  // Delete a User
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @Public()
  @UseGuards(AtGuard)
  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    let ErrorCode: number
    try {
      const user = await this.usersService.remove(userId)
      if (user?.status_code != HttpStatus.OK) {
        ErrorCode = user?.status_code;
        throw new Error(user?.message)
      }
      if (!user) {
        return Util?.handleFailResponse('User does not exist')
      } else {
        return user
      }
    } catch (error) {
      console.log(error)
      return Util?.handleRequestError(Util?.getTryCatchMsg(error), ErrorCode)
    }
  }
}
