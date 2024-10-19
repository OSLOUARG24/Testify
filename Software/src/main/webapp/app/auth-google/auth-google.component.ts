import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthGoogleService } from './auth-google.service';
import { UserService } from '../features/user/user.service';
import { User } from '../features/user/user.model';
import { NavbarService } from '../core/components/navbar/navbar.service'; // Importa el servicio


@Component({
  selector: 'app-auth-google',
  standalone: true,
  imports: [],
  templateUrl: './auth-google.component.html',
  styleUrl: './auth-google.component.css'
})
export class AuthGoogleComponent implements OnInit {

  isAuthenticated?: boolean;
  googleAccount?: any;
  user?: User;

  constructor(
    protected router: Router,
    protected userService: UserService,
    protected authGoogleService: AuthGoogleService,
    protected navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.authGoogleService.isAuthenticated().subscribe((authStatus: boolean) => {
      this.isAuthenticated = authStatus;
      if (this.isAuthenticated) {
        //
        this.googleAccount = this.authGoogleService.getProfile();
        this.userService.getUserByEmail(this.googleAccount.email).subscribe(
                (user: User) => {
                  this.user = user;
                  if (this.user){
                     localStorage.setItem('user',JSON.stringify(this.user));

                     if (this.user.admin) {
                       this.navbarService.notifyProjectChanged();
                     }

                     this.router.navigate(['/projectSelect']); // Cambia la ruta según tu lógica
                  }
                },
                error => {
                  console.error('Error al cargar el usuario:', error);
                  this.authGoogleService.logOut();
                }
              );
        //
      }
    });
  }

  async signInWithGoogle(){
    this.authGoogleService.login();
  }

}
