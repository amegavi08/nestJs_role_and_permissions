import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as DB_CONFIGS from 'src/database/config.json';
import { User } from './modules/users/entities/user.entity';
import { Role } from './modules/roles/entities/role.entity';
import { Permission } from './modules/permissions/entities/permission.entity';
import { UserRoles } from './modules/users/entities/userRoles';
import { RolePermissions } from './modules/roles/entities/rolesPermissions';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      Permission,
      UserRoles,
      RolePermissions
    ]),

    PassportModule,

    JwtModule.register({
      secret: process.env.jWT_ACCESS_SECRET,
      signOptions: {
        expiresIn:'5hrs'
      }
    }),

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      ...DB_CONFIGS[process.env.NODE_ENV],
      autoLoadModels: true,
    }),

    UsersModule,
    RolesModule,
    PermissionsModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
