import { ActionReducerMap, Store } from '@ngrx/store';
import { uiReducer, UiState } from "./shared/ui.reducers";
import { authReducer, AuthState } from './auth/auth.reducer';
import { OperationState, operationReducer } from './ingreso-egreso/operation.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
};
