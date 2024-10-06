import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleAssigment } from './role-assigment.model';
import { RoleAssigmentService } from './role-assigment.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet,RouterLinkActive,RouterLink, ActivatedRoute } from '@angular/router';
import { DeleteRoleAssigmentComponent } from './delete-role-assigment/delete-role-assigment.component';

@Component({
  selector: 'app-role-assigment',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './role-assigment.component.html',
  styleUrl: './role-assigment.component.css'
})

export class RoleAssigmentComponent implements OnInit {
   roleAssigments?: RoleAssigment[];
   roleAssigmentUserid?: number;

  constructor(protected route: ActivatedRoute
             ,protected router: Router
             ,protected roleAssigmentService: RoleAssigmentService
             ,public dialog: MatDialog) {}

  ngOnInit(): void {
      this.roleAssigmentUserid = this.route.snapshot.params['id'];
      if (this.roleAssigmentUserid){
        sessionStorage.setItem('roleAssigUserId',this.roleAssigmentUserid.toString());
        this.roleAssigmentService.getRoleAssigmentByUserId(this.roleAssigmentUserid!).subscribe(
              (data: RoleAssigment[]) => {
                this.roleAssigments = data;
              },
              error => {
                console.error('Error fetching roles', error);
              }
        );
      }
  }

  Cancel(): void {
      window.history.back();
  }

   openDeleteModal(roleAssigment: any): void {
                  const dialogRef = this.dialog.open(DeleteRoleAssigmentComponent, {
                    width: '600px',
                    data: { roleAssigment: roleAssigment }
                  });

                  dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                      this.fetchRoleAssigments();
                    }
                  });
                }

                fetchRoleAssigments(): void {
                  this.roleAssigmentService.getRoleAssigmentByUserId(this.roleAssigmentUserid!).subscribe(roleAssigments => {
                    this.roleAssigments = roleAssigments;
                  });
                }

}
