import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { StageService } from '../stage.service';
import { Stage, StageStatus, CheckList, Step, Document } from '../stage.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-test-stage',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './test-stage.component.html',
  styleUrls: ['./test-stage.component.css']
})
export class TestStageComponent implements OnInit {

    stage!: Stage;
    stageId?: number;
    stageForm!: FormGroup;
    statuses = Object.keys(StageStatus);

    constructor(
      private route: ActivatedRoute,
      private stageService: StageService,
      private router: Router,
      private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
      this.initializeForm();
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.stageId = +id;
          this.loadStageData(+id);
        }
      });
    }

    initializeForm(): void {
      this.stageForm = this.fb.group({
            name: ['', Validators.required],
            number: [null],
            iteration: [null, Validators.required],
            category: [null, Validators.required],
            type: [null, Validators.required],
            subType: [null, Validators.required],
            tester: [null, Validators.required],
            priority: [null, Validators.required],
            dateRequired: [null, Validators.required],
            testedFrom: [null, Validators.required],
            testedTo: [null, Validators.required],
            steps: this.fb.array([]),
            checkLists: this.fb.array([]),
            documents: this.fb.array([]),
            status: [null, Validators.required],
            comment: [''],
            expectedResult: [''],
            gotResult: [''],
            estimatedTime: ['']
          });
    }

    loadStageData(id: number): void {
      this.stageService.getStageById(id).subscribe(
        (stage: Stage) => {
          this.stage = stage;
          this.stageForm.patchValue({
            id: stage.id,
            name: stage.name,
            number: stage.number,
            iteration: stage.iteration,
            category: stage.category,
            type: stage.type,
            subType: stage.subType,
            tester: stage.tester,
            priority: stage.priority,
            steps: stage.steps,
            checkLists: stage.checkLists,
            documents: stage.documents,
            status: stage.status,
            comment: stage.comment,
            dateRequired: stage.dateRequired,
            testedFrom: stage.testedFrom,
            testedTo: stage.testedTo,
            expectedResult: stage.expectedResult,
            gotResult: stage.gotResult,
            estimatedTime: stage.estimatedTime
          });
          this.setCheckLists(stage.checkLists);
          this.setSteps(stage.steps);
          this.setDocuments(stage.documents);
        },
        (error) => {
          console.error('Error loading stage', error);
        }
      );
    }

    cancel(): void {
      window.history.back();
    }

  get checkLists(): FormArray {
    return this.stageForm.get('checkLists') as FormArray;
  }

  setCheckLists(checkLists: CheckList[]): void {
    checkLists.forEach(checkList => {
      this.checkLists.push(this.fb.group({
        description: [checkList.description, Validators.required],
        status: [checkList.status]
      }));
    });
  }

  get steps(): FormArray {
    return this.stageForm.get('steps') as FormArray;
  }

  setSteps(steps: Step[]): void {
    steps.forEach(step => {
      this.steps.push(this.fb.group({
        order: [step.orden],
        description: [step.description, Validators.required],
        comment: [],
        status: [step.status]
      }));
    });
  }

  get documents(): FormArray {
    return this.stageForm.get('documents') as FormArray;
  }

  addDocument(): void {
    this.documents.push(this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      document: ['', Validators.required]
    }));
  }

  setDocuments(documents: Document[]): void {
    documents.forEach(document => {
      this.documents.push(this.fb.group({
        description: [document.description, Validators.required],
        document: [document.document, Validators.required],
        name: [document.name, Validators.required]
      }));
    });
  }

selectDocument():void {
  alert("select document");
}

  removeDocument(index: number): void {
    this.documents.removeAt(index);
  }

  setStatus(index: number, status: string): void {
    const step = this.steps.at(index);
    if (step) {
      step.get('status')?.setValue(status);
    }
  }

  onSubmit(): void {
           console.log(JSON.stringify(this.stageForm.value));
    if (this.stageForm.invalid) {
      return;
    }
    const stageData: Stage = this.stageForm.value;
    this.stageService.updateStage(this.stageId!, this.stageForm.value).subscribe(() => {
      this.router.navigate(['/tester']);
    });
  }

  testedFromAftertestedTo(startDateKey: string, endDateKey: string) {
      return (formGroup: AbstractControl): { [key: string]: any } | null => {
        const startDateControl = formGroup.get(startDateKey);
        const endDateControl = formGroup.get(endDateKey);

        if (!startDateControl || !endDateControl) {
          return null; // No se puede validar si uno de los controles no existe
        }

        const startDate = new Date(startDateControl.value);
        const endDate = new Date(endDateControl.value);

        if (endDate < startDate) {
          return { testedFromAftertestedTo: true }; // Retorna un error si la fecha de fin es anterior a la de inicio
        }

        return null; // Si la validación pasa, retorna null
      };
    }

  onFileSelected(event: Event, index: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        this.documents.at(index).patchValue({
          document: fileContent.split(',')[1] // Se guarda solo el contenido base64
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        this.processFile(files[i]);
      }
      event.dataTransfer.clearData();
    }
  }

  processFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64File = reader.result as string;
      const newDocument = this.fb.group({
        name: [file.name, Validators.required],
        description: ['', Validators.required],
        document: [base64File.split(',')[1], Validators.required]  // Guardamos el contenido como base64
      });
      this.documents.push(newDocument);
    };
    reader.readAsDataURL(file);
  }

}
