
export enum ProjectStatus {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  FINALIZADO = 'FINALIZADO'
}

export interface ProjectApprovalStatus {
  id: number;
  approvalPercentage?: number;
}

export interface Project {
  id: number;
  name?: string | null;
  status?: ProjectStatus | null;
  rateApproval?: string | null;
}

