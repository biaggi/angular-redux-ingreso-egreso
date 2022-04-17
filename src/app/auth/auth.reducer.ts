import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';
import { UserModel, createUser } from '../model/user.model';

export interface AuthState {
  user: UserModel | undefined;
}

export const initialState: AuthState = { user: undefined };

export const authReducer = createReducer(
  initialState,

  on(actions.setUser, (state, { user }): AuthState => {
    return { ...state, user };
  }),
  on(actions.unsetUser, (state) => ({ ...state, user: undefined }))
);
