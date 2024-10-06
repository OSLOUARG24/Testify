export enum ProjectStatus {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  FINALIZADO = 'FINALIZADO'
}

export interface Project {
  id: number;
  name?: string | null;
  status?: string | null;
  rateApproval?: string | null;
}
