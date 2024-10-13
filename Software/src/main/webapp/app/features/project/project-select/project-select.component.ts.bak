import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { UserService } from '../../user/user.service';
import { AuthGoogleService } from '../../../auth-google/auth-google.service';
import { Router, RouterLink } from '@angular/router';
import { Project } from '../project.model';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-project-select',
  standalone: true,
  imports: [],
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.css']
})
export class ProjectSelectComponent implements OnInit {

  projects: Project[] = [];
  json: any = JSON;
  isAuthenticated = false;
  isAdmin = false;  // Variable para verificar si es administrador
  user?: User;
  googleAccount?: any;

  constructor(protected projectService: ProjectService,
              protected router: Router,
              protected userService: UserService,
              protected authGoogleService: AuthGoogleService) { }

  ngOnInit(): void {
    /**/
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
    /**/
    const user = localStorage.getItem('user');
    if (user){
       this.user = JSON.parse(user);
      if (this.user){
          this.isAdmin =  this.user.admin!;
          this.getProjects(this.user.email!);
      }
    }
  }

  // Cargar los proyectos asignados al usuario
  getProjects(email: string) {
    this.projectService.getProjectsByEmail(email).subscribe(
      (data: Project[]) => {
        this.projects = data;
        console.log('Proyectos asignados:', this.projects);
      },
      (error) => {
        console.error('Error al obtener los proyectos:', error);
      }
    );
  }


  // Manejo de la selección de proyecto
  onProjectSelect(event: any): void {
    const selectElement = event?.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue !== "null") {
      const selectedProject = JSON.parse(selectedValue);
      sessionStorage.setItem('project', JSON.stringify(selectedProject));
      console.log('Proyecto seleccionado guardado en sessionStorage:', selectedProject);
    } else {
      sessionStorage.removeItem('project');
      console.log('No se ha seleccionado ningún proyecto.');
    }
  }

  redirect(){
    if (this.isAdmin){
    this.router.navigate(['/project']);
    } else {
    //TODO
    this.router.navigate(['/testCase']);
    }
  }

}
