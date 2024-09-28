import { Routes } from '@angular/router';
import { AuthGoogleComponent } from './auth-google/auth-google.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';

export const routes: Routes = [
{ path: 'user', component: UserComponent },
{ path: 'user/create', component: UpdateUserComponent },
{ path: 'user/:id', component: UserComponent },
{ path: 'user/edit/:id', component: UpdateUserComponent },
{ path: 'dashboard', component: UserComponent },
{ path: '', component: AuthGoogleComponent, pathMatch: 'full' }
];
