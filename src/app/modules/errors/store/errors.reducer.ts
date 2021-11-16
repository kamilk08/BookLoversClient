import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from './errors.actions';

export interface CurrentErrorState {
  error: any,
  code: number
};

const initialState: CurrentErrorState = {
  error: undefined,
  code: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.THROW_UNAUTHORIZED_ERROR, (state, action) => ({ ...state, error: action.payload.error, code: action.payload.code })),
  on(fromActions.THROW_FORBIDDEN_ERROR, (state, action) => ({ ...state, error: action.payload.error, code: action.payload.code })),
  on(fromActions.THROW_INTERNAL_SERVER_ERROR, (state, action) => ({ ...state, error: action.payload.error, code: action.payload.code })),
  on(fromActions.THROW_NOT_FOUND_ERROR, (state, action) => ({ ...state, error: action.payload.error, code: action.payload.code }))
);


export function currentErrorReducer(state: CurrentErrorState, action: Action) {
  return reducer(state, action);
}
