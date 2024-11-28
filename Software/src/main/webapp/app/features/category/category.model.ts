
export interface Category {
  id?: number;
  name?: string | null;
}


export interface CategoryStatus {
  id?: string | null;
  projectId?: number;
  projectName?: string | null;
  categoryName?: string | null;
  pendingQuantity?: number;
  errorQuantity?: number;
  approvedQuantity?: number;
}
