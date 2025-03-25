import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { ActivatedRoute, Data, ParamMap, Router, RouterLink, RouterOutlet,RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { NavbarService } from '../../core/components/navbar/navbar.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Aseg?rate de importar MatPaginatorModule correctamente
import { ITEMS_PER_PAGE } from '../../app.constants';
import { getCustomPaginatorIntl } from '../../custom-paginator-intl';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatPaginatorModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  pageSize = ITEMS_PER_PAGE;
  pageIndex = 0;
  totalItems = 0;
  showSearch = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected userService: UserService
             ,protected router: Router
             ,public dialog: MatDialog
             ,protected navbarService: NavbarService) { }

     ngOnInit(): void {
        localStorage.removeItem('NameType');
        localStorage.removeItem('NameUser');
        localStorage.removeItem('NameRole');
        localStorage.removeItem('NameIteration');
        this.navbarService.notifyTypeChanged();
        this.navbarService.notifyUserChanged();
        this.navbarService.notifyRoleChanged();
        this.navbarService.notifyIterationChanged();
        this.userService.getUsers().subscribe(
          (data: User[]) => {
            this.users = data;
            this.filteredUsers = data; // Inicializa con todas las tipos
		    this.totalItems = data.length;
		    this.updatePaginatedUsers();
          },
          error => {
            console.error('Error fetching users', error);
          }
        );
      }


applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  this.filteredUsers = this.users.filter(user =>
    user.name?.toLowerCase().includes(filterValue) // Usa el operador de encadenamiento opcional (?.)
  );
  this.totalItems = this.filteredUsers.length;
  this.pageIndex = 0; // Reinicia a la primera pagina
  this.updatePaginatedUsers();
}

updatePaginatedUsers(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedUsers();
  }
    Cancel(): void {
        window.history.back();
      }

      openDeleteModal(user: any): void {
          const dialogRef = this.dialog.open(DeleteUserComponent, {
            width: '600px',
            data: { user: user }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.fetchUsers();
            }
          });
        }

        fetchUsers(): void {
          this.userService.getUsers().subscribe(users => {
            this.users = users;
          });
        }
 toggleSearch(): void {
    this.showSearch = !this.showSearch;
   }

   goRoleAssigment(user: User): void {
     localStorage.setItem('NameUser',user.name!);
     this.navbarService.notifyUserChanged();
     this.router.navigate(['/roleAssigment',user.id]);
     }

}
