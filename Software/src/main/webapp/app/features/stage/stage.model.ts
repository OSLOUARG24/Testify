import { Iteration } from '../iteration/iteration.model';
import { User } from '../user/user.model';
import { Type } from '../type/type.model';
import { SubType } from '../sub-type/sub-type.model';
import { Category } from '../category/category.model';

export interface CheckList {
  id?: number;
  description: string;
  status: boolean;
}

export interface Step {
  id?: number;
  orden: number;
  description: string;
  status?: string;
  comment?: string;
}

export interface Document {
  id: number;
  stage: Stage;
  name: string;
  description: string;
  document: Blob;
}

export enum Priority {
  BAJO = 'BAJO',
  MEDIO = 'MEDIO',
  ALTO = 'ALTO',
  URGENTE = 'URGENTE'
}

export enum StageStatus {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  ERROR = 'ERROR',
  FINALIZADO = 'FINALIZADO'
}

export interface Stage {
  id?: number;
  name?: string;
  number?: number;
  previousStage?: Stage;
  checkLists: CheckList[];
  steps: Step[];
  documents: Document[];
  iteration?: Iteration;
  category?: Category;
  type?: Type;
  subType?: SubType;
  tester?: User;
  priority?: Priority;
  status?: StageStatus;
  comment?: string;
  dateRequired?: Date | null;
  testedFrom?: Date | null;
  testedTo?: Date | null;
  expectedResult?: string;
  gotResult?: string;
  estimatedTime?: number;
}
