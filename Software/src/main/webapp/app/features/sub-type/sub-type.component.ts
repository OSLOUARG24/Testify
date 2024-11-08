
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet,RouterLinkActive,RouterLink  } from '@angular/router';
import { Type } from '../type/type.model';
import { TypeService } from '../type/type.service';
import { SubType } from './sub-type.model';
import { SubTypeService } from './sub-type.service';
import { User } from '../user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSubTypeComponent } from './delete-sub-type/delete-sub-type.component';

@Component({
  selector: 'app-sub-type',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sub-type.component.html',
  styleUrl: './sub-type.component.css'
})
export class SubTypeComponent implements OnInit {
  types: Type[] = [];
  subTypes: SubType[] = [];
  user: User = {};
  typeId: number = 0;

  constructor(private typeService: TypeService,
              private subTypeService: SubTypeService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFromStorage();
    this.loadSubTypes();
  }

  loadFromStorage(): void {
    // Recupera el usuario de localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  loadSubTypes(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.typeId = +idParam;
      localStorage.setItem('IdType',this.typeId.toString());
    } else {
       const idstorage = localStorage.getItem('IdType');
       if (idstorage){
        this.typeId = +idstorage;
       }
    }
    if (this.typeId){
    this.subTypeService.getSubTypesByTypeId(this.typeId).subscribe((subTypes: SubType[]) => {
      this.subTypes = subTypes;
    });
    } else {
    this.subTypeService.getSubTypes().subscribe((subTypes: SubType[]) => {
      this.subTypes = subTypes;
    });
    }
  }


  Cancel(): void {
    window.history.back();
  }

  openDeleteModal(subType: any): void {
    const dialogRef = this.dialog.open(DeleteSubTypeComponent, {
      width: '600px',
      data: { subType: subType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSubTypes();
      }
    });
  }
}
