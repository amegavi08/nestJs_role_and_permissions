import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Role,Permission])
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
