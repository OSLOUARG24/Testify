import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeService } from '../../type/type.service';
import { SubTypeService } from '../sub-type.service';
import { Type } from '../../type/type.model';
import { SubType } from '../sub-type.model';

@Component({
  selector: 'app-update-sub-type',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-sub-type.component.html',
  styleUrl: './update-sub-type.component.css'
})
export class UpdateSubTypeComponent implements OnInit {
  subTypeForm!: FormGroup;
  subTypeId: number | null = null;
  isEditMode: boolean = false;
  types: Type[] = [];
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private subTypeService: SubTypeService,
    private typeService: TypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.initializeForm();

    this.loadTypes();

        this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          if (id) {
               this.subTypeId = +id;
               this.isEditMode = true;
               this.loadSubTypeData(this.subTypeId);
          }
        });
  }

  loadTypes(): void {
    const idTypeSS = localStorage.getItem('IdType');
    if (idTypeSS) {
      // Cargar un tipo específico según el ID almacenado
      this.typeService.getTypeById(+idTypeSS).subscribe(
        (type: Type) => {
          this.types = [type]; // Solo se carga un tipo
          if (!this.isEditMode) {
            // Si no estamos en modo edición, asignar el tipo por defecto al formulario
            this.subTypeForm.patchValue({ type: type });
          }
        },
        (error) => {
          console.error('Error al cargar el tipo por ID desde el LocalStorage', error);
        }
      );
    } else {
      // Cargar todos los tipos si no hay un ID en el LocalStorage
      this.typeService.getTypes().subscribe(
        (types: Type[]) => {
          this.types = types;
          if (!this.isEditMode) {
            // Si no estamos en modo edición, puedes elegir un tipo predeterminado
            this.subTypeForm.patchValue({ type: types[0] }); // Selecciona el primer tipo como predeterminado, por ejemplo
          }
        },
        (error) => {
          console.error('Error al cargar los tipos', error);
        }
      );
    }
  }

  // Inicializa el formulario
  initializeForm(): void {
    this.subTypeForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]]
      });
  }

  // Cargar los datos de la Tipo si está en modo edición
  loadSubTypeData(id: number): void {
    this.subTypeService.getSubTypeById(id).subscribe(
      (subType: SubType) => {
         const selectedType = this.types.find(type => type.id === subType.type?.id);
         console.log('SubTipo cargado:', subType);
               console.log('Tipo seleccionado:', selectedType);
        this.subTypeForm.patchValue({
          type: selectedType,
          name: subType.name
        });
      },
      (error) => {
        console.error('Error al cargar el SubTipo', error);
      }
    );
  }

  // Enviar los datos para crear o actualizar la Tipo
  onSubmit(): void {
    if (this.subTypeForm.invalid) {
      return;
    }

    const subTypeData: SubType = this.subTypeForm.value;

    if (!subTypeData.type) {
      console.error('No se ha seleccionado un tipo.');
      return;
    }

    if (this.isEditMode) {
      this.updateSubType(this.subTypeId!, subTypeData);
    } else {
      this.createSubType(subTypeData);
    }
  }

  // Crear uno nuevo SubTipo
  createSubType(subType: SubType): void {
    this.subTypeService.createSubType(subType).subscribe({
      next: (response) => {
        console.log('SubTipo creado exitosamente');
        this.router.navigate(['/subType']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  // Actualizar una Tipo existente
  updateSubType(id: number, subType: SubType): void {
    this.subTypeService.updateSubType(id, subType).subscribe({
      next: (response) => {
        console.log('Subtipo actualizado exitosamente');
        this.router.navigate(['/subType']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  // Cancelar y volver a la lista de Subtipos
  cancel(): void {
    this.router.navigate(['/subType']);
  }
}
