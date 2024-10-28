import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})

export class UpdateCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryId: number | null = null;
  isEditMode: boolean = false;
  isAdmin: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkAdminStatus();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.categoryId = +id;
        this.isEditMode = true;
        this.loadCategoryData(this.categoryId);
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
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]]
      });
  }

  // Cargar los datos de la categoría si está en modo edición
  loadCategoryData(id: number): void {
    this.categoryService.getCategoryById(id).subscribe(
      (category: Category) => {
        this.categoryForm.patchValue({
          name: category.name,
        });
      },
      (error) => {
        console.error('Error al cargar la categoría', error);
      }
    );
  }

  // Enviar los datos para crear o actualizar la categoría
  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const categoryData: Category = this.categoryForm.value;
    console.log(categoryData);
    if (this.isEditMode) {
      this.updateCategory(this.categoryId!, categoryData);
    } else {
      this.createCategory(categoryData);
    }
  }

  // Crear una nueva categoría
  createCategory(category: Category): void {
    this.categoryService.createCategory(category).subscribe({
      next: (response) => {
        console.log('Categoría creada exitosamente');
        this.router.navigate(['/category']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  // Actualizar una categoría existente
  updateCategory(id: number, category: Category): void {
    this.categoryService.updateCategory(id, category).subscribe({
      next: (response) => {
        console.log('Categoría actualizada exitosamente');
        this.router.navigate(['/category']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  // Cancelar y volver a la lista de categorías
  cancel(): void {
    this.router.navigate(['/category']);
  }
}
