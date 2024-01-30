import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/modules/permissions/entities/permission.entity'; 

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata('permissions', permissions);