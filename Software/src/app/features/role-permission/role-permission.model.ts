import { Role } from '../role/role.model';
import { Permission } from '../permission/permission.model';

export interface RolePermission {
  id?: number;
  role?: Role;
  permission?: Permission;
}
