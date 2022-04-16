import { createReducer, on } from "@ngrx/store";
import * as uiActions from "./ui.actions";
export interface UiState {
  loading: boolean;
}

export const initialState = { loading: false };

export const uiReducer = createReducer(
  initialState,
  on(uiActions.setLoading, (state) => ({ ...state, loading: true })),
  on(uiActions.stopLoading, (state) => ({ ...state, loading: false }))
);
