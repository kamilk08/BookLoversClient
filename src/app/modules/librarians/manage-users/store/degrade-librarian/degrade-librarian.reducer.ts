import { Action, createReducer, on } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import * as fromActions from './degrade-librarian.actions';

export interface DegradeLibrarianState {
  guid: UUID;
  processing: boolean;
  error: any
}

const initialState: DegradeLibrarianState = {
  guid: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.DEGRADE_LIBRARIAN, (state, action) => {
    return { ...state, processing: true, guid: action.payload.readerGuid }
  }),
  on(fromActions.DEGRADE_LIBRARAIN_SUCCESS, (state => ({ ...state, processing: false }))),
  on(fromActions.DEGRADE_LIBRARIAN_ERROR, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
);

export function degradeLibrarianReducer(state: DegradeLibrarianState, action: Action) {
  return reducer(state, action);
}
