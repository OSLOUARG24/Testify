import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet,RouterLinkActive,RouterLink  } from '@angular/router';
import { Type } from './type.model';
import { TypeService } from './type.service';
import { User } from '../user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTypeComponent } from './delete-type/delete-type.component';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  types: Type[] = [];
  user: User = {};

  constructor(private typeService: TypeService,
              public dialog: MatDialog) {}

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

  

  Cancel(): void {
    window.history.back();
  }

  openDeleteModal(type: any): void {
    const dialogRef = this.dialog.open(DeleteTypeComponent, {
      width: '600px',
      data: { type: type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTypes();
      }
    });
  }

  fetchTypes(): void {
    this.typeService.getTypes().subscribe(types => {
      this.types = types;
    });
  }
}
