import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Permission } from "src/modules/permissions/entities/permission.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import { UsersService } from "src/modules/users/users.service";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Roles } from "src/modules/roles/role.enum";

// @Injectable()
// export class RoleGuard implements CanActivate {

//     constructor (
//         private reflector: Reflector,
//         private userService: UsersService
//     ) {}

//     async canActivate(context: ExecutionContext): Promise<boolean>{
        
//         const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
//             'roles',
//             [
//             context.getHandler(),
//             context.getClass()
//         ]
//         );

//         const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
//             'permissions',
//             [
//             context.getHandler(),
//             context.getClass()
//         ]
//         );

//         if (!requiredRoles && requiredPermissions) {
//             return true;
//         }

//         // Extract user information from the request
//         const request = context.switchToHttp().getRequest();
//         const userId = request.user.id;

//         // Fetch the user roles and permissions from the database
//         const user = await this.userService.findOne(userId);

//         if (!user){
//             return false;
//         }

//         // Check if the user has the required role
//         if (requiredRoles && requiredRoles.length > 0){
//             const hasRoles = requiredRoles.every(
//                 (roles) => user.roles.some(
//                     (userRole) => userRole.name === roles.name
//                 )
//             );

//             if(!hasRoles){
//                 return false;
//             }
//         }

//         // Check if the user has the required permissions
//         if (requiredPermissions && requiredPermissions.length > 0){
//             const userPermissions = user.permissions.flatMap(
//                 (role) => role.permissions.map(
//                     (permissions) => permissions.name
//                 )
//             );
            
//             const hasPermissions = requiredPermissions.every(
//                 (permission) => userPermissions.includes(
//                     permission.name
//                 )
//             );

//             if (!hasPermissions) {
//                 return false;
//             }
//         }
//         return true;
//     }

// }

