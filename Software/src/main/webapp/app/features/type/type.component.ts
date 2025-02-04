import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet,RouterLinkActive,RouterLink  } from '@angular/router';
import { Type } from './type.model';
import { TypeService } from './type.service';
import { User } from '../user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTypeComponent } from './delete-type/delete-type.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Aseg�rate de importar MatPaginatorModule correctamente
import { ITEMS_PER_PAGE } from '../../app.constants';
import { getCustomPaginatorIntl } from '../../custom-paginator-intl';
import { NavbarService } from '../../core/components/navbar/navbar.service'; // Importa el servicio

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatPaginatorModule],
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  types: Type[] = [];
  filteredTypes: Type[] = [];
  paginatedTypes: Type[] = [];
  user: User = {};
  pageSize = ITEMS_PER_PAGE;
  pageIndex = 0;
  totalItems = 0;
  showSearch = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private typeService: TypeService,
              public dialog: MatDialog,
              private router: Router,
              private navbarService: NavbarService) {}

  ngOnInit(): void {
    localStorage.removeItem('NameType');
    localStorage.removeItem('NameUser');
    localStorage.removeItem('NameRole');
    localStorage.removeItem('NameIteration');
    this.navbarService.notifyTypeChanged();
    this.navbarService.notifyUserChanged();
    this.navbarService.notifyRoleChanged();
    this.navbarService.notifyIterationChanged();
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
      this.filteredTypes = types; // Inicializa con todas las tipos
      this.totalItems = types.length;
      this.updatePaginatedTypes();
    });
  }

applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  this.filteredTypes = this.types.filter(type =>
    type.name?.toLowerCase().includes(filterValue) // Usa el operador de encadenamiento opcional (?.)
  );
  this.totalItems = this.filteredTypes.length;
  this.pageIndex = 0; // Reinicia a la primera pagina
  this.updatePaginatedTypes();
}

updatePaginatedTypes(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTypes = this.filteredTypes.slice(startIndex, endIndex);
  }

onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedTypes();
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
 toggleSearch(): void {
    this.showSearch = !this.showSearch;
   }

   goSubType(type: Type): void {
     localStorage.setItem('NameType',type.name!);
     this.navbarService.notifyTypeChanged();
     this.router.navigate(['/subType',type.id]);
     }
}
