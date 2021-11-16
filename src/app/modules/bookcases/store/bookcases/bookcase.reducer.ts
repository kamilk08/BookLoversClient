import { Bookcase } from '../../models/bookcase.model';
import * as fromActions from './bookcase.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { fetchSingle, hasEntity } from 'src/app/modules/shared/common/store-extensions';

export interface BookcasesState {
  entities: { [id: number]: Bookcase }
  ids: number[],
  processing: boolean,
  error: any
}

const initialState: BookcasesState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_BOOKCASE, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_USER_BOOKCASE, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_CURRENT_USER_BOOKCASE, state => ({ ...state, processing: true })),
  on(fromActions.FETCH_BOOKCASE, (state, action) => {
    const newState = fetchSingle((bookcase: Bookcase) => bookcase.identification.id, state, action.payload.bookcase);
    return {
      ...state, entities: { ...newState.entities }, ids: newState.ids, processing: false
    };
  }),
  on(fromActions.ADD_OR_UPDATE_BOOKCASE, (state, action) => {
    const newState = fetchSingle((bookcase: Bookcase) => bookcase.identification.id, state, action.payload.bookcase);
    return {
      ...state, entities: { ...newState.entities }, ids: newState.ids, processing: false
    };
  }),
  on(fromActions.FETCH_BOOKCASE_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model })),
  on(fromActions.BOOKCASE_NOT_FOUND, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  })
);

export function bookcaseReducer(state: BookcasesState, action: Action) {
  return reducer(state, action);
}
