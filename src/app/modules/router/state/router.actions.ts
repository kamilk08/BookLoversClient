import { createAction, props } from '@ngrx/store';
import { RouterRoute } from './router.interfaces';

export const MOVE_TO = createAction('[ROUTER] Move to', props<{ payload: { moveTo: RouterRoute } }>());
export const FORWARD = createAction('[ROUTER] Forward');
export const BACK = createAction('[ROUTER] Back');
