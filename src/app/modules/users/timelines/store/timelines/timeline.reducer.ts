import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './timeline.actions';
import { fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import { TimeLine } from '../../../../api/timelines/models/timeline.interface';

export interface TimeLinesState {
  entities: { [id: number]: TimeLine },
  ids: number[]
  processing: boolean,
  error: any
}

export const initialState: TimeLinesState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_TIMELINE, (state) => ({ ...state, processing: true })),
  on(fromActions.SELECT_READER_TIMELINE, (state) => ({ ...state, processing: true })),
  on(fromActions.FETCH_READER_TIMELINE, (state, action) => {
    const newState = fetchSingle((tl: TimeLine) => tl.indentification.id, state, action.payload.timeLine);

    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_READER_TIMELINE_FALIURE, (state) => ({ ...state, processing: false })),
  on(fromActions.TIMELINE_NOT_FOUND, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function timeLineReducer(state: TimeLinesState, action: Action) {
  return reducer(state, action);
}
