import { createReducer, on } from '@ngrx/store';
import * as action from './operation.actions';
import { OperationModel } from '../model/ingreso-egreso';
import { AppState } from '../app.reducer';

export interface OperationState {
  items: OperationModel[];
}

export interface AppStateOperation extends AppState {
  operations: OperationState;
}

export const initialState: OperationState = { items: [] };

export const operationReducer = createReducer(
  initialState,
  on(action.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(action.unsetItems, (state) => {
    return { ...state, items: [] };
  })
);
