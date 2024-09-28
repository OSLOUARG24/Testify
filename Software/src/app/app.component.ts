import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthGoogleService } from './auth-google/auth-google.service';
import { AuthGoogleComponent } from './auth-google/auth-google.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AuthGoogleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'Testify';

  isAuthenticated = false;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected authGoogleService: AuthGoogleService
  ) {}


  ngOnInit(){
        this.authGoogleService.isAuthenticated().subscribe((authStatus) => {
            this.isAuthenticated = authStatus;
        });
  }
}
