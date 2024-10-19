import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkActive, RouterLink, NavigationEnd } from '@angular/router';
import { Project } from './features/project/project.model';
import { AuthGoogleService } from './auth-google/auth-google.service';
import { FooterComponent } from './core/components/footer/footer.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AuthGoogleComponent } from './auth-google/auth-google.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FooterComponent
   , NavbarComponent
   , AuthGoogleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'Testify';

  isAuthenticated = false;
  constructor(
    protected authGoogleService: AuthGoogleService
  ) {}

  ngOnInit(){
      this.authGoogleService.isAuthenticated().subscribe((authStatus) => {
          this.isAuthenticated = authStatus;
      });
  }
}
