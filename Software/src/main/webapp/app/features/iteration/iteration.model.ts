import { Project } from '../project/project.model';

export interface Iteration {
  id?: number;
  project?: Project;
  name?: string | null;
  status?: string | null;
  startDate?: Date  | null;
  endDate?: Date  | null;
}
