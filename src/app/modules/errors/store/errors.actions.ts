import { createAction, props } from '@ngrx/store';

export const THROW_UNAUTHORIZED_ERROR = createAction('[ERRORS] Throw unauhorized error', props<{ payload: { error: any, code?: 401 } }>());
export const THROW_FORBIDDEN_ERROR = createAction('[ERRORS] Throw forbidden error', props<{ payload: { error: any, code?: 403 } }>());
export const THROW_INTERNAL_SERVER_ERROR = createAction('[ERRORS] Throw internal servier error', props<{ payload: { error: any, code?: 500 } }>());
export const THROW_NOT_FOUND_ERROR = createAction('[ERRORS] Throw no found error', props<{ payload: { error: any, code?: 404 } }>());
