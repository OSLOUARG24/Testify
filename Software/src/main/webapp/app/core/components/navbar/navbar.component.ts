import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthGoogleService } from '../../../auth-google/auth-google.service';
import { Project } from '../../../features/project/project.model';
import { CommonModule } from '@angular/common';
import { Observable} from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../../features/user/user.model';
import { RoleAssigmentService } from '../../../features/role-assigment/role-assigment.service';
import { RoleAssigment } from '../../../features/role-assigment/role-assigment.model';
import { NavbarService } from './navbar.service'; // Asegúrate de importar el servicio


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;

  googleAccount?: any;
  roleAssigments: RoleAssigment[] = [];
  name?: string;
  projects?: Project[] = [];
  selectedProjectId: number = 0;
  user?: User;

  constructor(
    protected navbarService: NavbarService,
    protected router: Router,
    protected authGoogleService: AuthGoogleService,
    protected roleAssigmentService: RoleAssigmentService,
    protected http: HttpClient
  ) {}

  ngOnInit() {
      this.initializeNavbar();
    }

    initializeNavbar(){
      this.getStorageValues();
      // Comprobar si el usuario está autenticado
      this.authGoogleService.isAuthenticated().subscribe((authStatus) => {
        this.isAuthenticated = authStatus;
        if (this.isAuthenticated) {
          this.googleAccount = this.authGoogleService.getProfile();
          this.name = this.googleAccount.family_name + ', ' + this.googleAccount.given_name;
        }
      });

      this.navbarService.projectChanged$.subscribe(() => {
         this.getStorageValues();
      });
    }

  getStorageValues() {
    const user = localStorage.getItem('user');
    if (user){
       this.user = JSON.parse(user);
    }

    const roles = sessionStorage.getItem('userRoles');
    if (roles){
      this.roleAssigments = JSON.parse(roles);
    }
  }

  hasRole(roleCode: string): boolean {
    return this.roleAssigments.some((assignment: RoleAssigment) => assignment.role?.code === roleCode);
  }

  isAdmin() {
     return this.user?.admin;
   }

  isGestor() {
     return this.hasRole('GESTOR');
  }

  isInvitado() {
     return this.hasRole('GUEST');
  }

  isTester(): boolean {
     return this.hasRole('TESTER');
  }

  isAuth() {
     return this.isAuthenticated;
  }

  logoff() {
    this.authGoogleService.logOut();
    this.router.navigate(['/login']);
  }

  redirect() {
    this.getStorageValues();
    if (this.isGestor() || this.isInvitado() || this.isAdmin()){
      this.router.navigate(['/project']);
    } else {
      if (this.isTester()){
        this.router.navigate(['/tester']);
      }
      else {
        this.router.navigate(['/projectSelect']);
      }
    }
  }

}
