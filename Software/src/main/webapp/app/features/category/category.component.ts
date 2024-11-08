import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet,RouterLinkActive,RouterLink  } from '@angular/router';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { User } from '../user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Asegúrate de importar MatPaginatorModule correctamente
import { ITEMS_PER_PAGE } from '../../app.constants';
import { getCustomPaginatorIntl } from '../../custom-paginator-intl';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatPaginatorModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  paginatedCategories: Category[] = [];
  user: User = {};
  pageSize = ITEMS_PER_PAGE;
  pageIndex = 0;
  totalItems = 0;
  showSearch = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      this.filteredCategories = categories; // Inicializa con todas las categorías
      this.totalItems = categories.length;
      this.updatePaginatedCategories();
    });
  }

applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  this.filteredCategories = this.categories.filter(category =>
    category.name?.toLowerCase().includes(filterValue) // Usa el operador de encadenamiento opcional (?.)
  );
  this.totalItems = this.filteredCategories.length;
  this.pageIndex = 0; // Reinicia a la primera página
  this.updatePaginatedCategories();
}

updatePaginatedCategories(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCategories = this.filteredCategories.slice(startIndex, endIndex);
  }

onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedCategories();
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

 toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
}
