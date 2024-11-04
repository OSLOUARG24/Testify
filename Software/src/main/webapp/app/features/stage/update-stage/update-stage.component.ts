import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StageService } from '../stage.service';
import { Stage, CheckList, Step, Priority, StageStatus } from '../stage.model';
import { Project } from '../../project/project.model';
import { Iteration } from '../../iteration/iteration.model';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { TypeService } from '../../type/type.service';
import { Type } from '../../type/type.model';
import { SubTypeService } from '../../sub-type/sub-type.service';
import { SubType } from '../../sub-type/sub-type.model';
import { CategoryService } from '../../category/category.service';
import { UserService } from '../../user/user.service';
import { IterationService } from '../../iteration/iteration.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-update-stage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-stage.component.html',
  styleUrl: './update-stage.component.css'
})
export class UpdateStageComponent implements OnInit {

  isEditMode = false;
  stageForm!: FormGroup;
  stageId?: number;
  iterations: Iteration[] = [];
  iterationId?: number;
  errorMessage: string = '';

  // Opciones para los dropdowns
  types: Type[] = [];
  subTypes: SubType[] = [];
  categories: any[] = [];
  testers: any[] = [];
  priorities = Object.values(Priority);
  //statuses = Object.keys(StageStatus);
  statuses = Object.values(StageStatus);
  projectId?: number;

  allStages: Stage[] = [];

  constructor(
    private route: ActivatedRoute,
    private stageService: StageService,
    private typeService: TypeService,
    private subTypeService: SubTypeService,
    private categoryService: CategoryService,
    private userService: UserService,
    private iterationService: IterationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.stageId = +id;
        this.isEditMode = true;
        this.loadOptions();
        this.loadStageData(this.stageId);
      } else {
        this.loadOptions();
        this.setStageNumber();
        this.stageForm.patchValue({ status: StageStatus.PENDIENTE });
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
          steps: this.fb.array([]),
          checkLists: this.fb.array([]),
          status: [null, Validators.required],
          comment: [''],
          expectedResult: [null, Validators.required],
          gotResult: [''],
          estimatedTime: [null, Validators.required]
        });
  }

  loadStageData(id: number): void {
      this.stageService.getStageById(id).subscribe(
        (stage: Stage) => {

          const iteration = this.iterations.find(t => t.id === stage.iteration?.id);
          const type = this.types.find(t => t.id === stage.type?.id);
          const subType = this.subTypes.find(st => st.id === stage.subType?.id);
          const category = this.categories.find(c => c.id === stage.category?.id);
          const tester = this.testers.find(c => c.id === stage.tester?.id);

          this.stageForm.patchValue({
            id: stage.id,
            name: stage.name,
            number: stage.number,
            iteration: iteration,
            category: category,
            type: type,
            subType: subType,
            tester: tester,
            priority: stage.priority,
            steps: stage.steps,
            checkLists: stage.checkLists,
            status: stage.status,
            comment: stage.comment,
            dateRequired: stage.dateRequired,
            expectedResult: stage.expectedResult,
            gotResult: stage.gotResult,
            estimatedTime: stage.estimatedTime
          });
          this.setCheckLists(stage.checkLists);
          this.setSteps(stage.steps);
        },
        (error) => {
          console.error('Error loading stage', error);
        }
      );
    }

  loadOptions(): void {
    const projectSession = sessionStorage.getItem('project');
    if (projectSession){
     this.projectId = JSON.parse(projectSession).id;
     this.userService.getUsersByRole(this.projectId!).subscribe(testers => this.testers = testers);
     const Iid = sessionStorage.getItem('Iid');
     if (Iid != null){
       this.iterationService.getIterationById(+Iid).subscribe(iteration => {
                                                                    this.stageForm.patchValue({ iteration: iteration });
                                                                    this.iterations.push(iteration); // Añade la iteración a la lista de iteraciones si no está cargada
                                                                  });
     } else {
       this.iterationService.getIterationsByProjectId(this.projectId!).subscribe(iterations => this.iterations = iterations);
     }
    }
    this.typeService.getTypes().subscribe(types => this.types = types);
    this.subTypeService.getSubTypes().subscribe(subTypes => this.subTypes = subTypes);
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);

  }

  get checkLists(): FormArray {
    return this.stageForm.get('checkLists') as FormArray;
  }

  addCheckList(): void {
    this.checkLists.push(this.fb.group({
      description: ['', Validators.required],
      status: [false]
    }));
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

  addStep(): void {
    const currentOrder = this.steps.length + 1;
    this.steps.push(this.fb.group({
      order: [currentOrder],
      description: ['', Validators.required],
      comment: [''],
      status: [StageStatus.PENDIENTE]
    }));
  }

  removeStep(index: number): void {
    // Remover el step del FormArray en la posición indicada
    this.steps.removeAt(index);
  }

  removeCheckList(index: number): void {
    // Remover el checkList del FormArray en la posición indicada
    this.checkLists.removeAt(index);
  }

  setSteps(steps: Step[]): void {
    steps.forEach(step => {
      this.steps.push(this.fb.group({
        orden: [step.orden],
        description: [step.description, Validators.required],
        comment: [step.comment],
        status: [step.status]
      }));
    });
  }

onSubmit(): void {

    if (this.stageForm.invalid) {
      return;
    }

    const stageData: Stage = this.stageForm.value;

    // Asegurar que el objeto stage es el correcto
    if (!stageData.type) {
      console.error('No se ha seleccionado un tipo.');
      return;
    }

    if (!stageData.subType) {
      console.error('No se ha seleccionado un subtipo.');
      return;
    }
    if (this.isEditMode) {
      this.stageService.updateStage(this.stageId!, this.stageForm.value).subscribe(() => {
        this.router.navigate(['/stage']);
      });
    } else {
      this.stageService.createStage(this.stageForm.value).subscribe({
      next: (response) => {
          console.log('Escenario creado exitosamente');
          this.router.navigate(['/stage']);
        },
        error: (error) => {
          // Mostrar mensaje de error
          this.errorMessage = error.message;
        }
      });
    }
  }
    cancel(): void {
      this.router.navigate(['/stage']);
    }

  setStageNumber(): void {
      if (this.projectId) {
        this.stageService.getStagesByProjectId(this.projectId).subscribe((data: Stage[]) => {
         this.allStages = data;
         this.stageForm.patchValue({ number: this.allStages.length + 1 });
        });
      }
    }

  getStatusDescription(status: StageStatus): string {
      switch (status) {
        case StageStatus.PENDIENTE:
          return 'Pendiente';
        case StageStatus.APROBADO:
          return 'Aprobado';
        case StageStatus.ERROR:
          return 'Error';
        case StageStatus.FINALIZADO:
          return 'Finaliado';
        default:
          return '';
      }
    }

  getPriorityDescription(priority: Priority): string {
        switch (priority) {
          case Priority.BAJO:
            return 'Bajo';
          case Priority.MEDIO:
            return 'Medio';
          case Priority.ALTO:
            return 'Alto';
          case Priority.URGENTE:
            return 'Urgente';
          default:
            return '';
        }
      }

}
