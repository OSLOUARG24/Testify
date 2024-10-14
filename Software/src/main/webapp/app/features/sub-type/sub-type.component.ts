
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet,RouterLinkActive,RouterLink  } from '@angular/router';
import { Type } from '../type/type.model';
import { TypeService } from '../type/type.service';
import { SubType } from './sub-type.model';
import { SubTypeService } from './sub-type.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-sub-type',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sub-type.component.html',
  styleUrl: './sub-type.component.css'
})
export class SubTypeComponent implements OnInit {
  types: Type[] = [];
  subTypes: SubType[] = [];
  user: User = {};

  constructor(private typeService: TypeService,
              private subTypeService: SubTypeService) {}

  ngOnInit(): void {
    this.loadFromStorage();
    this.loadSubTypes();
  }

  loadFromStorage(): void {
    // Recupera el usuario de localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  loadSubTypes(): void {
    this.subTypeService.getSubTypes().subscribe((subTypes: SubType[]) => {
      this.subTypes = subTypes;
    });
  }

  // Método para eliminar la categoría
  deleteSubType(subTypeId: number): void {
    alert('Elimina Type ' + subTypeId);
  }

  Cancel(): void {
    window.history.back();
  }
}
