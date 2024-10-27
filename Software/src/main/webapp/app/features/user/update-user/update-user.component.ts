import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  userId: number | null = null;
  isEditMode = false;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.userId;

    this.initForm();

    if (this.isEditMode) {
      this.loadUser();
    }
  }

  // Inicializar el formulario
  initForm(): void {
    this.userForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      admin: [false]
    });
  }

  // Cargar datos del usuario si es en modo edición
  loadUser(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (user: User) => {
          this.userForm.patchValue({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin
          });
        },
        error => {
          console.error('Error al cargar el usuario:', error);
        }
      );
    }
  }

  // Guardar los datos del usuario
  saveUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    const user: User = this.userForm.value;

    if (this.isEditMode) {
      this.userService.updateUser(user).subscribe(
        () => {
          console.log('Usuario actualizado exitosamente');
          this.router.navigate(['/user']);
        },
        error => {
          console.error('Error al actualizar el usuario:', JSON.stringify(error));
        }
      );
    } else {
      this.userService.createUser(user).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente');
          this.router.navigate(['/user']);
        },
        error: (error) => {
          // Mostrar mensaje de error
          this.errorMessage = error.message;
        }
      });
    }
  }

  // Cancelar y volver a la lista de usuarios
  cancel(): void {
    this.router.navigate(['/user']);
  }
}
