import { Routes } from '@angular/router';
import { AuthGoogleComponent } from './auth-google/auth-google.component';

export const routes: Routes = [
{ path: 'dashboard', component: AuthGoogleComponent },
{ path: '', component: AuthGoogleComponent, pathMatch: 'full' }
];
