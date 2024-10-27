import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet,RouterLinkActive,RouterLink  } from '@angular/router';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { User } from '../user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  user: User = {};

  constructor(private categoryService: CategoryService
             ,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFromStorage();
    this.loadCategories();
  }

  loadFromStorage(): void {
    // Recupera el usuario de localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  Cancel(): void {
    window.history.back();
  }

   openDeleteModal(category: any): void {
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      width: '600px',
      data: { category: category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchCategories();
      }
    });
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
