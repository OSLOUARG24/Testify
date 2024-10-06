import { Role } from '../role/role.model';
import { Project } from '../project/project.model';
import { User } from '../user/user.model';

export interface RoleAssigment {
  id?: number;
  user?: User;
  role?: Role;
  project?: Project;
}
