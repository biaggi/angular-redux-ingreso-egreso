import { ActionReducerMap } from "@ngrx/store";
import { uiReducer, UiState } from "./shared/ui.reducers";

export interface AppState {
  ui: UiState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
};
