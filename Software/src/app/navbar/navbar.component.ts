import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthGoogleService } from '../auth-google/auth-google.service';
import { Project } from '../project/project.model';
import { CommonModule } from '@angular/common';
import { Observable} from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../user/user.model';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;

  googleAccount?: any;
  userRoles: string[] = [];
  name?: string;
  projects?: Project[] = [];
  selectedProjectId: number = 0;
  user?: User;

  constructor(
    protected router: Router,
    protected authGoogleService: AuthGoogleService,
    protected http: HttpClient
  ) {}

  ngOnInit() {
      const user = localStorage.getItem('user');
      if (user){
         this.user = JSON.parse(user);
      }
      // Comprobar si el usuario está autenticado
      this.authGoogleService.isAuthenticated().subscribe((authStatus) => {
        this.isAuthenticated = authStatus;
        if (this.isAuthenticated) {
          this.googleAccount = this.authGoogleService.getProfile();
          this.name = this.googleAccount.family_name + ', ' + this.googleAccount.given_name;
          this.getUserInfo(this.googleAccount.email).subscribe(userInfo => {
                              console.log(JSON.stringify(userInfo));
                            }
            ,
             error => {
               console.error('Error fetching users', error);
             }
           )
        }
      });
    }

    getUserInfo(email: string): Observable<any> {
          let project = sessionStorage.getItem('project');
          const idProject = JSON.parse(project!).id;
          if(idProject == null){this.router.navigate(['/selectedProject']);}
          const params = new HttpParams()
                .set('email', email)
                .set('idProject', idProject);
            return this.http.get<any>('http://localhost:8080/api/user-info',{ params }).pipe(
              map(response => {
                //this.name = response.name;
                this.userRoles = response.roles;
                sessionStorage.setItem('userRoles',JSON.stringify(this.userRoles));
                return response;
              })
            );

    }

    hasRole(role: string): boolean {
        return this.userRoles.includes(role);
    }

  isAdmin() {
     return this.user?.admin;
   }

  isGestor() {
     return this.hasRole('ROLE_GESTOR_DE_PRUEBAS');
  }

  isInvitado() {
     return this.hasRole('ROLE_INVITADO');
  }

  isTester(): boolean {
           return this.hasRole('ROLE_TESTER');
  }

  isDeveloper(): boolean {
           return this.hasRole('ROLE_DEVELOPER');
  }

  isAuth() {
             return this.isAuthenticated;
    }

  logoff() {
    this.authGoogleService.logOut();
    this.router.navigate(['/login']);
  }

}
