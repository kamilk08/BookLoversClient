import { createReducer, on, Action } from '@ngrx/store';
import { fetchSingle, fetchMany } from 'src/app/modules/shared/common/store-extensions';
import { Series } from '../../../api/series/models/series.model';
import * as fromActions from './series.actions';

export interface SeriesState {
  entities: { [id: number]: Series }
  ids: number[]
  processing: boolean
  error: any
}

const initialState: SeriesState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
};


const reducer = createReducer(initialState,
  on(fromActions.SELECT_SERIES, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_MULTIPLE_SERIES, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_SERIES_BY_BOOK, state => ({ ...state, processing: true })),
  on(fromActions.FETCH_SERIES, (state, action) => {
    const newState = fetchSingle((bs: Series) => bs.identification.id, state, action.payload.series);

    return { ...state, processing: false, entities: newState.entities, ids: newState.ids };
  }),
  on(fromActions.FETCH_MULTIPLE_SERIES, (state, action) => {
    const newState = fetchMany((bs: Series) => bs.identification.id, state, action.payload.series);

    return { ...state, processing: false, entities: newState.entities, ids: newState.ids }
  }),
  on(fromActions.FETCH_SERIES_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model })),
  on(fromActions.SERIES_NOT_FOUND, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function seriesReducer(state: SeriesState, action: Action) {
  return reducer(state, action);
}
