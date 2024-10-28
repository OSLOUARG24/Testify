import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeService } from '../type.service';
import { Type } from '../type.model';

@Component({
  selector: 'app-update-type',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-type.component.html',
  styleUrl: './update-type.component.css'
})
export class UpdateTypeComponent implements OnInit {
  typeForm!: FormGroup;
  typeId: number | null = null;
  isEditMode: boolean = false;
  isAdmin: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkAdminStatus();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.typeId = +id;
        this.isEditMode = true;
        this.loadTypeData(this.typeId);
      }
    });
  }

  // Verifica si el usuario es administrador
  checkAdminStatus(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.isAdmin = user.admin || false;
    }
  }

  // Inicializa el formulario
  initializeForm(): void {
    this.typeForm = this.fb.group({
      name: ['', [Validators.required]]
      });
  }

  // Cargar los datos de la Tipo si está en modo edición
  loadTypeData(id: number): void {
    this.typeService.getTypeById(id).subscribe(
      (type: Type) => {
        this.typeForm.patchValue({
          name: type.name,
        });
      },
      (error) => {
        console.error('Error al cargar la Tipo', error);
      }
    );
  }

  // Enviar los datos para crear o actualizar la Tipo
  onSubmit(): void {
    if (this.typeForm.invalid) {
      return;
    }

    const typeData: Type = this.typeForm.value;

    if (this.isEditMode) {
      this.updateType(this.typeId!, typeData);
    } else {
      this.createType(typeData);
    }
  }

  // Crear una nueva Tipo
  createType(type: Type): void {
    this.typeService.createType(type).subscribe({
      next: (response) => {
        console.log('Tipo creado exitosamente');
        this.router.navigate(['/type']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  // Actualizar una Tipo existente
  updateType(id: number, type: Type): void {
    this.typeService.updateType(id, type).subscribe({
      next: (response) => {
        console.log('Categoría actualizada exitosamente');
        this.router.navigate(['/type']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  // Cancelar y volver a la lista de Tipos
  cancel(): void {
    this.router.navigate(['/type']);
  }
}
