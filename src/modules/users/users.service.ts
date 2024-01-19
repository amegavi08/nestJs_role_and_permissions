import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import * as Util from '../../../utils/index'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2'
import { LoginDTO } from 'src/auth/loginDTO';
import { UserRoles } from './entities/userRoles';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(UserRoles) private userRoleModel: typeof UserRoles,
    private jwtService: JwtService,
    private config: ConfigService
  ){}

  // Creating users
  async createUser(createUserDto: CreateUserDto) {
    try {
      

      const hashPwd = await argon.hash(createUserDto.password);

      let insertQry = {
        username: createUserDto?.username,
        password: hashPwd
      }
      const newUser = await User?.create(insertQry);
      await newUser.save();
      return Util.SuccessRespone('User created Successfully')

    } catch (error) {
      console.log(error)
      return Util.handleGrpcTryCatchError(Util.getTryCatchMsg(error))
    }
  }

  // Assiging Roles to users
  async assignRoleToUser(userId: string, roleName: string) {
    try {
      const user = await this.userModel.findOne({
        where: {
          userId: userId
        }
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const role = await this.roleModel.findOne({
        where: {
          name: roleName
        }
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      await role.$add('user', user);

      return Util.SuccessRespone('User assigned role');
    } catch (error) {
      console.error(error);
      return Util.handleGrpcTryCatchError(Util.getTryCatchMsg(error));
    }
  }

  // Login User
  async login (loginDto: LoginDTO) {
    const { username, password } = loginDto;

    try {

      const user = await User.findOne({
        where: {
          username
        }
      });

      const role =  await UserRoles.findOne({
        where: {
          userId: user?.id
        }
      });

      if (!user){
        return Util?.handleFailResponse('Invalid username or password');
      }

      const passwordMatch = await argon.verify(
        user.password,
        loginDto.password
      );

      if (!passwordMatch) {
        return Util.handleFailResponse('Invalid username or password');
      }

      let tokens = await this?.getTokens(
        user?.userId,
        role?.roleId,
        user?.username
      );

      let userData = {
        id: user?.userId,
        userId: user?.userId,
        userame: user?.username
      }
      
      let userDetails = {
        userData,
        tokens
      }

      return Util?.handleCustonCreateResponse(
        userDetails,
        'Login Successful'
      )

    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }
     
  }

  async findAll() {
    try {

      const allUsers = await User.findAll({
        attributes: { exclude: ['password','createdAt', 'updatedAt', 'deletedAt'] },
      })
      return Util?.handleSuccessRespone(
        allUsers,
        'Users Data retrieved successfully.',
      );

    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }
  }

  async findOne(userId: string) {
    
    try {
      
      const user = await User.findOne({
        where: {
          userId
        },
        attributes: { exclude: ['password','createdAt', 'updatedAt', 'deletedAt'] },
      })

    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }

  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    try {
      
      const user = await User.findOne({ 
        where: { 
          userId,
          } 
        });
      if (!user) {
        return Util?.handleFailResponse('User data not found')
      }
      Object.assign(user, updateUserDto)
      await user.save()
      return Util?.handleSuccessRespone(user, 'User data updated successfully')

    } catch (error) {
      console.log(error)
      return Util?.handleGrpcTryCatchError(Util?.getTryCatchMsg(error))
    }
  }

  async remove(userId: string) {
    
  }


  async getTokens(
    user_id: string,
    role_id: string,
    username: string,
  ) {
    const jwtPayload = {
      sub: user_id,
      role_id: role_id,
      scopes: username
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        // expiresIn: '15m',
        expiresIn: '7d',
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '360d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

}
