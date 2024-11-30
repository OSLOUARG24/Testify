import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet,RouterLinkActive,RouterLink  } from '@angular/router';
import { Type } from '../type/type.model';
import { TypeService } from '../type/type.service';
import { SubType } from './sub-type.model';
import { SubTypeService } from './sub-type.service';
import { User } from '../user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSubTypeComponent } from './delete-sub-type/delete-sub-type.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Aseg?rate de importar MatPaginatorModule correctamente
import { ITEMS_PER_PAGE } from '../../app.constants';
import { getCustomPaginatorIntl } from '../../custom-paginator-intl';

@Component({
  selector: 'app-sub-type',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatPaginatorModule],
  templateUrl: './sub-type.component.html',
  styleUrl: './sub-type.component.css'
})
export class SubTypeComponent implements OnInit {
  types: Type[] = [];
  subTypes: SubType[] = [];
  filteredSubTypes: SubType[] = [];
  paginatedSubTypes: SubType[] = [];
  user: User = {};
  typeId: number = 0;
  pageSize = ITEMS_PER_PAGE;
  pageIndex = 0;
  totalItems = 0;
  showSearch = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      this.filteredSubTypes = subTypes; // Inicializa con todas las tipos
      this.totalItems = subTypes.length;
      this.updatePaginatedSubTypes();
    });
    } else {
    this.subTypeService.getSubTypes().subscribe((subTypes: SubType[]) => {
      this.subTypes = subTypes;
      this.filteredSubTypes = subTypes; // Inicializa con todas las tipos
      this.totalItems = subTypes.length;
      this.updatePaginatedSubTypes();
    });
    }
  }

applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  this.filteredSubTypes = this.subTypes.filter(subType =>
    subType.name?.toLowerCase().includes(filterValue) // Usa el operador de encadenamiento opcional (?.)
  );
  this.totalItems = this.filteredSubTypes.length;
  this.pageIndex = 0; // Reinicia a la primera pagina
  this.updatePaginatedSubTypes();
}

updatePaginatedSubTypes(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSubTypes = this.filteredSubTypes.slice(startIndex, endIndex);
  }

onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedSubTypes();
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

 toggleSearch(): void {
    this.showSearch = !this.showSearch;
   }
}
