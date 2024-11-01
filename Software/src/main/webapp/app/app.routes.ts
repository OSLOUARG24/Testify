import { Routes } from '@angular/router';

import { ProjectComponent } from './features/project/project.component';
import { UpdateProjectComponent } from './features/project/update-project/update-project.component';
import { ProjectSelectComponent } from './features/project/project-select/project-select.component';
import { IterationComponent } from './features/iteration/iteration.component';
import { UpdateIterationComponent } from './features/iteration/update-iteration/update-iteration.component';

import { StageComponent } from './features/stage/stage.component';
import { UpdateStageComponent } from './features/stage/update-stage/update-stage.component';
import { StageDetailComponent } from './features/stage/stage-detail/stage-detail.component';
import { TesterStageComponent } from './features/stage/tester-stage/tester-stage.component';
import { TestStageComponent } from './features/stage/test-stage/test-stage.component';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGoogleComponent } from './auth-google/auth-google.component';
import { UserComponent } from './features/user/user.component';
import { UpdateUserComponent } from './features/user/update-user/update-user.component';

import { RoleComponent } from './features/role/role.component';
import { UpdateRoleComponent } from './features/role/update-role/update-role.component';
import { RoleAssigmentComponent } from './features/role-assigment/role-assigment.component';
import { UpdateRoleAssigmentComponent } from './features/role-assigment/update-role-assigment/update-role-assigment.component';
import { PermissionComponent } from './features/permission/permission.component';
import { UpdatePermissionComponent } from './features/permission/update-permission/update-permission.component';
import { RolePermissionComponent } from './features/role-permission/role-permission.component';
import { UpdateRolePermissionComponent } from './features/role-permission/update-role-permission/update-role-permission.component';

import { CategoryComponent } from './features/category/category.component';
import { UpdateCategoryComponent } from './features/category/update-category/update-category.component';
import { TypeComponent } from './features/type/type.component';
import { UpdateTypeComponent } from './features/type/update-type/update-type.component';
import { SubTypeComponent } from './features/sub-type/sub-type.component';
import { UpdateSubTypeComponent } from './features/sub-type/update-sub-type/update-sub-type.component';

export const routes: Routes = [
{ path: 'project', component: ProjectComponent },
{ path: 'project/create', component: UpdateProjectComponent },
{ path: 'project/:id', component: ProjectComponent },
{ path: 'project/edit/:id', component: UpdateProjectComponent },
//
{ path: 'iteration', component: IterationComponent },
{ path: 'iteration/create', component: UpdateIterationComponent },
{ path: 'iteration/:id', component: IterationComponent },
{ path: 'iteration/edit/:id', component: UpdateIterationComponent },
//
{ path: 'stage', component: StageComponent },
{ path: 'stage/create', component: UpdateStageComponent },
{ path: 'stage/:id', component: StageComponent },
{ path: 'stage/edit/:id', component: UpdateStageComponent },
{ path: 'stage/test/edit/:id', component: TestStageComponent },
{ path: 'stage/detail/:id', component: StageDetailComponent },
//
{ path: 'category', component: CategoryComponent },
{ path: 'category/create', component: UpdateCategoryComponent },
{ path: 'category/:id', component: CategoryComponent },
{ path: 'category/edit/:id', component: UpdateCategoryComponent },
//
{ path: 'type', component: TypeComponent },
{ path: 'type/create', component: UpdateTypeComponent },
{ path: 'type/:id', component: TypeComponent },
{ path: 'type/edit/:id', component: UpdateTypeComponent },
//
{ path: 'subType', component: SubTypeComponent },
{ path: 'subType/create', component: UpdateSubTypeComponent },
{ path: 'subType/:id', component: SubTypeComponent },
{ path: 'subType/edit/:id', component: UpdateSubTypeComponent },
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
{ path: 'dashboard', component: DashboardComponent },
{ path: 'projectSelect', component: ProjectSelectComponent },
{ path: 'tester', component: TesterStageComponent },
{ path: '', component: AuthGoogleComponent, pathMatch: 'full' }
];
