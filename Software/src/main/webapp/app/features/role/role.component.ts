import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from './role.service';
import { ActivatedRoute, Data, ParamMap, Router, RouterLink, RouterOutlet,RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Role } from './role.model';
import { DeleteRoleComponent } from './delete-role/delete-role.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Aseg?rate de importar MatPaginatorModule correctamente
import { ITEMS_PER_PAGE } from '../../app.constants';
import { getCustomPaginatorIntl } from '../../custom-paginator-intl';
import { NavbarService } from '../../core/components/navbar/navbar.service'; // Importa el servicio


@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatPaginatorModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  roles: Role[]= [];
  filteredRoles: Role[] = [];
  paginatedRoles: Role[] = [];
  pageSize = ITEMS_PER_PAGE;
  pageIndex = 0;
  totalItems = 0;
  showSearch = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected roleService: RoleService,
              public dialog: MatDialog,
              private router: Router,
              private navbarService: NavbarService) { }


     ngOnInit(): void {
       localStorage.removeItem('NameType');
       localStorage.removeItem('NameUser');
       localStorage.removeItem('NameRole');
       this.navbarService.notifyTypeChanged();
       this.navbarService.notifyUserChanged();
       this.navbarService.notifyRoleChanged();
        this.roleService.getRoles().subscribe(
          (data: Role[]) => {
            this.roles = data;
            this.filteredRoles = data; // Inicializa con todas las tipos
		    this.totalItems = data.length;
		    this.updatePaginatedRoles();
          },
          error => {
            console.error('Error fetching roles', error);
          }
        );
      }


applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  this.filteredRoles = this.roles.filter(role =>
    role.name?.toLowerCase().includes(filterValue) // Usa el operador de encadenamiento opcional (?.)
  );
  this.totalItems = this.filteredRoles.length;
  this.pageIndex = 0; // Reinicia a la primera pagina
  this.updatePaginatedRoles();
}

updatePaginatedRoles(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRoles = this.filteredRoles.slice(startIndex, endIndex);
  }

onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedRoles();
  }

    Cancel(): void {
        window.history.back();
      }

    openDeleteModal(role: any): void {
      const dialogRef = this.dialog.open(DeleteRoleComponent, {
        width: '600px',
        data: { role: role }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.fetchRoles();
        }
      });
    }

    fetchRoles(): void {
      this.roleService.getRoles().subscribe(roles => {
        this.roles = roles;
      });
    }

 toggleSearch(): void {
    this.showSearch = !this.showSearch;
   }

   goPermissions(role: Role): void {
     localStorage.setItem('NameRole',role.name!);
     this.navbarService.notifyRoleChanged();
     this.router.navigate(['/rolePermission',role.id]);
     }
}
