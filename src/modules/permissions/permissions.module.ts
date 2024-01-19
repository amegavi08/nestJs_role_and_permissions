import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Permission])
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
