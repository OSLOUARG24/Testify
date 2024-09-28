import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { ProjectSelectComponent } from './project/project-select/project-select.component';
import { RoleComponent } from './role/role.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { RoleAssigmentComponent } from './role-assigment/role-assigment.component';
import { UpdateRoleAssigmentComponent } from './role-assigment/update-role-assigment/update-role-assigment.component';
import { PermissionComponent } from './permission/permission.component';
import { UpdatePermissionComponent } from './permission/update-permission/update-permission.component';
import { AuthGoogleComponent } from './auth-google/auth-google.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';

export const routes: Routes = [
{ path: 'project', component: ProjectComponent },
{ path: 'project/create', component: UpdateProjectComponent },
{ path: 'project/:id', component: ProjectComponent },
{ path: 'project/edit/:id', component: UpdateProjectComponent },
//
{ path: 'role', component: RoleComponent },
{ path: 'role/create', component: UpdateRoleComponent },
{ path: 'role/:id', component: RoleComponent },
{ path: 'role/edit/:id', component: UpdateRoleComponent },
//
{ path: 'roleAssigment', component: RoleAssigmentComponent },
{ path: 'roleAssigment/create', component: UpdateRoleAssigmentComponent },
{ path: 'roleAssigment/:id', component: RoleAssigmentComponent },
{ path: 'roleAssigment/edit/:id', component: UpdateRoleAssigmentComponent },
//
{ path: 'permission', component: PermissionComponent },
{ path: 'permission/create', component: UpdatePermissionComponent },
{ path: 'permission/:id', component: PermissionComponent },
{ path: 'permission/edit/:id', component: UpdatePermissionComponent },
//
{ path: 'user', component: UserComponent },
{ path: 'user/create', component: UpdateUserComponent },
{ path: 'user/:id', component: UserComponent },
{ path: 'user/edit/:id', component: UpdateUserComponent },
//
{ path: 'dashboard', component: ProjectSelectComponent },
{ path: '', component: AuthGoogleComponent, pathMatch: 'full' }
];
