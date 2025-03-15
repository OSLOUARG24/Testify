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
  project?: Project;
  selectedProjectId: number = 0;
  user?: User;
  type?: string;
  role?: string;
  Nameuser?: string;
  iteration?: string;

   permissions: string[] = []; // Lista de permisos del usuario

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
          this.loadPermissions(); // Cargar permisos cuando el usuario está autenticado
        }
      });

      this.navbarService.projectChanged$.subscribe(() => {
         this.getStorageValues();
         this.loadPermissions(); // Recargar permisos cuando cambia el proyecto
      });

      this.navbarService.typeChanged$.subscribe(() => {
             this.getTypeValues();
      });
      this.navbarService.userChanged$.subscribe(() => {
             this.getUserValues();
             this.loadPermissions(); // Recargar permisos cuando cambia el proyecto
      });
      this.navbarService.roleChanged$.subscribe(() => {
                 this.getRoleValues();
                 this.loadPermissions(); // Recargar permisos cuando cambia el proyecto
      });
      this.navbarService.iterationChanged$.subscribe(() => {
                 this.getIterationValues();
      });
    }

   getRoleValues() {
    const role = localStorage.getItem('NameRole');
        if (role){
           this.role = role;
        }
      else
      {this.role = '';}
  }

  getTypeValues() {
    const type = localStorage.getItem('NameType');
        if (type){
           this.type = type;
        }
      else
      {this.type = '';}
  }

  getUserValues() {
    const Nameuser = localStorage.getItem('NameUser');
        if (Nameuser){
           this.Nameuser = Nameuser;
        }
      else
      {this.Nameuser = '';}
  }

  getIterationValues() {
    const Nameiteration = localStorage.getItem('NameIteration');
        if (Nameiteration){
           this.iteration = Nameiteration;
        }
      else
      {this.iteration = '';}
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

    const project = sessionStorage.getItem('project');
      if (project){
        this.project = JSON.parse(project);
        if (this.project){
        this.selectedProjectId = this.project.id;
        }
      }
    else {
      this.project = undefined;
      this.selectedProjectId = 0;
      }
  }

  loadPermissions() {
    if (!this.user) {
      this.permissions = [];
      return;
    }
    
   this.roleAssigmentService.getPermissionsByUserIdAndProjectId(this.user.id!,this.selectedProjectId).subscribe((data) => {
    this.permissions = data;
  });
  
    
  }

  hasPermission(permission: string): boolean {
    // Dividir el permiso en palabras
    const words = permission.split('_');
  
    // Si hay menos de 2 palabras, hacer la verificación normal
    if (words.length < 2) {
      return this.permissions.includes(permission);
    }
  
    // Obtener las dos primeras palabras del permiso
    const prefix = words.slice(0, 2).join('_'); // Ejemplo: "Consultar Iteraciones"
  
    // Buscar si algún permiso almacenado empieza con esas dos palabras
    return this.permissions.some(perm => perm.startsWith(prefix));
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
    if (this.hasPermission("CONSULTAR_PROYECTOS")){
      if (this.project ){
        this.router.navigate(['/project']);
      }
      else {
        this.router.navigate(['/projectSelect']);
      }
    } else {
      if (this.hasPermission("REALIZAR_PRUEBAS")){
        if (this.project){
          this.router.navigate(['/tester']);
        } else {
          this.router.navigate(['/projectSelect']);
        }
      }
      else {
        this.router.navigate(['/projectSelect']);
      }
    }
  }

}
