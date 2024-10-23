import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { AuthGoogleService } from '../../auth-google/auth-google.service';
import { AuthGoogleComponent } from '../../auth-google/auth-google.component';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{

  isAuthenticated = false;
  googleAccount?: any;
  user?: User;


  constructor(
    protected router: Router,
    protected authGoogleService: AuthGoogleService,
    protected userService: UserService
  ) {}

  ngOnInit(){
        this.authGoogleService.isAuthenticated().subscribe((authStatus) => {
            this.isAuthenticated = authStatus;
            if (this.isAuthenticated){
              this.googleAccount = this.authGoogleService.getProfile();
              this.userService.getUserByEmail(this.googleAccount.email).subscribe(
                (user: User) => {
                  this.user = user;
                  if (this.user){
                     localStorage.setItem('user',JSON.stringify(this.user));
                     this.router.navigate(['/projectSelect']);
                  } else {
                  this.authGoogleService.logOut();
                  }
                },
                error => {
                  console.error('Error al cargar el usuario:', error);
                  this.authGoogleService.logOut();
                }
              );
            }
        });
  }
}
