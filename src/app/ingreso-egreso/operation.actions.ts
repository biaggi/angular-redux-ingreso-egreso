import { createAction, props } from '@ngrx/store';
import { OperationModel } from '../model/ingreso-egreso';

export const setItems = createAction('[Operations] setItems', props<{items: OperationModel[]}>());
export const usetItems = createAction('[Operations] unsetItems');
