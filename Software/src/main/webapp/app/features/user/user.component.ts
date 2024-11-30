import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { Router, RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { NavbarService } from '../../core/components/navbar/navbar.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users?: User[];

  constructor(protected userService: UserService
             ,protected router: Router
             ,public dialog: MatDialog
             ,protected navbarService: NavbarService) { }

     ngOnInit(): void {
        localStorage.removeItem('NameType');
        localStorage.removeItem('NameUser');
        localStorage.removeItem('NameRole');
        this.navbarService.notifyTypeChanged();
        this.navbarService.notifyUserChanged();
        this.navbarService.notifyRoleChanged();
        this.userService.getUsers().subscribe(
          (data: User[]) => {
            this.users = data;
          },
          error => {
            console.error('Error fetching users', error);
          }
        );
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


   goRoleAssigment(user: User): void {
     localStorage.setItem('NameUser',user.name!);
     this.navbarService.notifyUserChanged();
     this.router.navigate(['/roleAssigment',user.id]);
     }

}
