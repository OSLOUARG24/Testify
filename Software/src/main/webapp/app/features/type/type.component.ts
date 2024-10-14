import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet,RouterLinkActive,RouterLink  } from '@angular/router';
import { Type } from './type.model';
import { TypeService } from './type.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent implements OnInit {
  types: Type[] = [];
  user: User = {};

  constructor(private typeService: TypeService) {}

  ngOnInit(): void {
    this.loadFromStorage();
    this.loadTypes();
  }

  loadFromStorage(): void {
    // Recupera el usuario de localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  loadTypes(): void {
    this.typeService.getTypes().subscribe((types: Type[]) => {
      this.types = types;
    });
  }

  // Método para eliminar la categoría
  deleteType(typeId: number): void {
    alert('Elimina Type ' + typeId);
  }

  Cancel(): void {
    window.history.back();
  }
}
