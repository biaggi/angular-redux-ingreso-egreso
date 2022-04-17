import { createReducer, on } from '@ngrx/store';
import * as action from './operation.actions';
import { OperationModel } from '../model/ingreso-egreso';
import { unsetUser } from '../auth/auth.actions';

export interface OperationState {
  items: OperationModel[];
}

export const initialState: OperationState = { items: [] };

export const operationReducer = createReducer(
  initialState,
  on(action.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(action.usetItems, (state) => ({ ...state, items: [] }))
);
