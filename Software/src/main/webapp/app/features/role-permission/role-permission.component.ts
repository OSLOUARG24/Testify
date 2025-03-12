import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermission } from './role-permission.model';
import { Router, RouterOutlet, RouterLinkActive, RouterLink, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRolePermissionComponent } from './delete-role-permission/delete-role-permission.component';

@Component({
  selector: 'app-role-permission',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './role-permission.component.html',
  styleUrl: './role-permission.component.css'
})

export class RolePermissionComponent {
rolePermissions?: RolePermission[];
roleId?: number;

  constructor(protected rolePermissionService: RolePermissionService
             ,protected router: Router
             ,protected route: ActivatedRoute
             ,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.roleId = Number(this.route.snapshot.params['id']); // Asegúrate de que sea un número
    if (this.roleId) {
      localStorage.setItem('IdRole',this.roleId.toString());
      this.rolePermissionService.getPermissionsByRoleId(this.roleId).subscribe(
        (data: RolePermission[]) => {
          this.rolePermissions = data;
        },
        error => {
          console.error('Error fetching permissions', error);
        }
      );
    }
  }

  openDeleteModal(rolePermission: any): void {
    const dialogRef = this.dialog.open(DeleteRolePermissionComponent, {
      width: '600px',
      data: { rolePermission: rolePermission }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchRolePermissions();
      }
    });
  }

  fetchRolePermissions(): void {
    this.rolePermissionService.getPermissionsByRoleId(this.roleId!).subscribe(perms => {
      this.rolePermissions = perms;
    });
  }

}
