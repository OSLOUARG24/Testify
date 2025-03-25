import { Component, OnInit, ViewChild  } from '@angular/core';
import { Permission } from './permission.model';
import { PermissionService } from './permission.service';
import { ActivatedRoute, Data, ParamMap, Router, RouterLink, RouterOutlet,RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeletePermissionComponent } from './delete-permission/delete-permission.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Aseg?rate de importar MatPaginatorModule correctamente
import { ITEMS_PER_PAGE } from '../../app.constants';
import { getCustomPaginatorIntl } from '../../custom-paginator-intl';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatPaginatorModule],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css'
})
export class PermissionComponent {
  permissions: Permission[] = [];
  filteredPermissions: Permission[] = [];
  paginatedPermissions: Permission[] = [];
  pageSize = ITEMS_PER_PAGE;
  pageIndex = 0;
  totalItems = 0;
  showSearch = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected permissionService: PermissionService
             ,public dialog: MatDialog) { }


     ngOnInit(): void {
        this.permissionService.getPermissions().subscribe(
          (data: Permission[]) => {
            this.permissions = data;
            this.filteredPermissions = data; // Inicializa con todas las tipos
		    this.totalItems = data.length;
		    this.updatePaginatedPermissions();
          },
          error => {
            console.error('Error fetching permissions', error);
          }
        );
      }


applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  this.filteredPermissions = this.permissions.filter(permission =>
    permission.name?.toLowerCase().includes(filterValue) // Usa el operador de encadenamiento opcional (?.)
  );
  this.totalItems = this.filteredPermissions.length;
  this.pageIndex = 0; // Reinicia a la primera pagina
  this.updatePaginatedPermissions();
}

updatePaginatedPermissions(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPermissions = this.filteredPermissions.slice(startIndex, endIndex);
  }

onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedPermissions();
  }
    Cancel(): void {
        window.history.back();
      }


      openDeleteModal(permission: any): void {
                const dialogRef = this.dialog.open(DeletePermissionComponent, {
                  width: '600px',
                  data: { permission: permission }
                });

                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    this.fetchPermissions();
                  }
                });
              }

              fetchPermissions(): void {
                this.permissionService.getPermissions().subscribe(perms => {
                  this.permissions = perms;
                });
              }
 toggleSearch(): void {
    this.showSearch = !this.showSearch;
   }
}
