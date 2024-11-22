import { Project } from '../project/project.model';

export interface Iteration {
  id?: number;
  project?: Project;
  name?: string | null;
  status?: string | null;
  startDate?: Date  | null;
  endDate?: Date  | null;
}

export interface IterationStatus {
  id?: string | null;
  projectId?: number;
  projectName?: string | null;
  iterationName?: string | null;
  pendingQuantity?: number;
  errorQuantity?: number;
  approvedQuantity?: number;
}
