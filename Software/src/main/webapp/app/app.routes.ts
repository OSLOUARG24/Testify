import { Routes } from '@angular/router';
import { ProjectComponent } from './features/project/project.component';
import { UpdateProjectComponent } from './features/project/update-project/update-project.component';
import { ProjectSelectComponent } from './features/project/project-select/project-select.component';
import { RoleComponent } from './features/role/role.component';
import { UpdateRoleComponent } from './features/role/update-role/update-role.component';
import { RoleAssigmentComponent } from './features/role-assigment/role-assigment.component';
import { UpdateRoleAssigmentComponent } from './features/role-assigment/update-role-assigment/update-role-assigment.component';
import { PermissionComponent } from './features/permission/permission.component';
import { UpdatePermissionComponent } from './features/permission/update-permission/update-permission.component';
import { RolePermissionComponent } from './features/role-permission/role-permission.component';
import { UpdateRolePermissionComponent } from './features/role-permission/update-role-permission/update-role-permission.component';
import { AuthGoogleComponent } from './auth-google/auth-google.component';
import { UserComponent } from './features/user/user.component';
import { UpdateUserComponent } from './features/user/update-user/update-user.component';

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
{ path: 'rolePermission', component: RolePermissionComponent },
{ path: 'rolePermission/create', component: UpdateRolePermissionComponent },
{ path: 'rolePermission/:id', component: RolePermissionComponent },
{ path: 'rolePermission/edit/:id', component: UpdateRolePermissionComponent },
//
{ path: 'user', component: UserComponent },
{ path: 'user/create', component: UpdateUserComponent },
{ path: 'user/:id', component: UserComponent },
{ path: 'user/edit/:id', component: UpdateUserComponent },
//
{ path: 'dashboard', component: ProjectSelectComponent },
{ path: 'projectSelect', component: ProjectSelectComponent },
{ path: '', component: AuthGoogleComponent, pathMatch: 'full' }
];
