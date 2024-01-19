import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { RolePermissions } from './entities/rolesPermissions';
import { User } from '../users/entities/user.entity';
import { UserRoles } from '../users/entities/userRoles';

@Module({
  imports: [
    SequelizeModule.forFeature([Role,Permission,UserRoles])
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
