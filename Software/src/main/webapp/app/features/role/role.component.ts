import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from './role.service';
import { ActivatedRoute, Data, ParamMap, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Role } from './role.model';
import { DeleteRoleComponent } from './delete-role/delete-role.component';
import { NavbarService } from '../../core/components/navbar/navbar.service'; // Importa el servicio


@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  roles?: Role[];

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
          },
          error => {
            console.error('Error fetching roles', error);
          }
        );
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


   goPermissions(role: Role): void {
     localStorage.setItem('NameRole',role.name!);
     this.navbarService.notifyRoleChanged();
     this.router.navigate(['/rolePermission',role.id]);
     }
}
