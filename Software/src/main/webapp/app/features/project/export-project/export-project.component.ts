import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-export-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './export-project.component.html',
  styleUrl: './export-project.component.css'
})
export class ExportProjectComponent {

  projectForm!: FormGroup;
  projectId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

ngOnInit(): void {

  this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.projectId = +id;
        }
      });

  this.projectForm = this.fb.group({
    status: [],
    stage: []
    })
  }

  onSubmit(): void {

    this.projectService.exportPDF(this.projectId,
      this.projectForm.get('status')?.value ?? false,
        this.projectForm.get('stageq')?.value ?? false
      ).subscribe(
          (response) => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            // Crear un enlace temporal para la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `project_report_${this.projectId}.pdf`;
            link.click();

            // Liberar el objeto URL después de la descarga
            window.URL.revokeObjectURL(url);
          },
          (error) => {
            console.error('Error downloading PDF', error);
          }
        );
  }

  cancel(): void {
        this.router.navigate(['/project']);
  }
}
