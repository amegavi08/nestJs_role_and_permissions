import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRoles } from './entities/userRoles';
import { AtStrategy } from 'src/strategies/access.strategy';
import { RtStrategy } from 'src/strategies/refresh.strategy';

@Module({
  imports: [SequelizeModule.forFeature([
    User,
    Role,
    Permission,
    UserRoles
  ])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AtStrategy,
    RtStrategy,
    JwtService,
    ConfigService
  ],
})
export class UsersModule {}
