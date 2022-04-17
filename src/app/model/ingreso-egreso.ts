export type IngresoEgresoType = 'ingreso' | 'egreso';
export interface OperationModel {
  description: string;
  amount: number;
  type: IngresoEgresoType
  uid: string;
}
