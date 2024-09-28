import { Component } from '@angular/core';
import { Permission } from './permission.model';
import { PermissionService } from './permission.service';
import { ActivatedRoute, Data, ParamMap, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeletePermissionComponent } from './delete-permission/delete-permission.component';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css'
})
export class PermissionComponent {
 permissions?: Permission[];


  constructor(protected permissionService: PermissionService
             ,public dialog: MatDialog) { }


     ngOnInit(): void {
        this.permissionService.getPermissions().subscribe(
          (data: Permission[]) => {
            this.permissions = data;
          },
          error => {
            console.error('Error fetching permissions', error);
          }
        );
      }

    Cancel(): void {
        window.history.back();
      }


      openDeleteModal(permission: any): void {
                const dialogRef = this.dialog.open(DeletePermissionComponent, {
                  width: '300px',
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
}
