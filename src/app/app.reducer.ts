import { ActionReducerMap } from "@ngrx/store";
import { uiReducer, UiState } from "./shared/ui.reducers";
import { authReducer, AuthState } from './auth/auth.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
};
