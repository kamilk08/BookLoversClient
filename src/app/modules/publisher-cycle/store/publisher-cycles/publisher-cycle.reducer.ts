import * as fromActions from './publisher-cycle.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { fetchSingle, fetchMany } from 'src/app/modules/shared/common/store-extensions';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface PublisherCyclesState {
  entities: { [id: number]: PublisherCycle },
  ids: number[],
  processing: boolean
  error: ApiError
}

const initialState: PublisherCyclesState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_PUBLISHER_CYCLE, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_MULTIPLE_PUBLISHER_CYCLES, state => ({ ...state, processing: true })),
  on(fromActions.FETCH_PUBLISHER_CYCLE, (state, action) => {
    const newState = fetchSingle((pc: PublisherCycle) => pc.identification.id, state, action.payload.cycle);

    return { ...state, processing: false, entities: newState.entities, ids: newState.ids }
  }),
  on(fromActions.FETCH_MULTIPLE_PUBLISHER_CYCLES, (state, action) => {
    const newState = fetchMany((pc: PublisherCycle) => pc.identification.id, state, action.payload.cycles);

    return { ...state, processing: false, entities: newState.entities, ids: newState.ids }
  }),
  on(fromActions.FETCH_PUBLISHER_CYCLE_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error })),
  on(fromActions.PUBLISHER_CYCLE_NOT_FOUND, (state, action) => ({ ...state, model: action.payload.model, processing: false }))
);

export function publisherCycleReducer(state: PublisherCyclesState, action: Action) {
  return reducer(state, action);
}
