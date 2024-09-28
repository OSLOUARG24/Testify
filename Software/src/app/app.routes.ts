import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { ProjectSelectComponent } from './project/project-select/project-select.component';
import { AuthGoogleComponent } from './auth-google/auth-google.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';

export const routes: Routes = [
{ path: 'project', component: ProjectComponent },
{ path: 'project/create', component: UpdateProjectComponent },
{ path: 'project/:id', component: ProjectComponent },
{ path: 'project/edit/:id', component: UpdateProjectComponent },
{ path: 'user', component: UserComponent },
{ path: 'user/create', component: UpdateUserComponent },
{ path: 'user/:id', component: UserComponent },
{ path: 'user/edit/:id', component: UpdateUserComponent },
{ path: 'dashboard', component: ProjectSelectComponent },
{ path: '', component: AuthGoogleComponent, pathMatch: 'full' }
];
