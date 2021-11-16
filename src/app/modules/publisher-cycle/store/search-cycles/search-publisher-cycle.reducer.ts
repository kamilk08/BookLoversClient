import { Query } from 'src/app/modules/shared/common/query';
import { createReducer, on, Action } from '@ngrx/store';
import * as actions from './search-publisher-cycle.actions';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface SearchPublisherCycle {
    entities: PublisherCycle[]
    processing: boolean
    query: Query
    error: ApiError
}

const initialState: SearchPublisherCycle = {
    entities: [],
    processing: false,
    query: undefined,
    error: undefined
}

const reducer = createReducer(initialState,
    on(actions.START_FILTERING_PUBLISHER_CYCLES, (state, action) => ({ ...state, processing: true, query: action.payload.query })),
    on(actions.STOP_FILTERING_PUBLISHER_CYCLES, state => ({ ...state, processing: false })),
    on(actions.FETCH_FILTERED_PUBLISHER_CYCLES, (state, action) => ({ ...state, processing: false, entities: action.payload.cycles })),
    on(actions.FILTER_PUBLISHER_CYCLES_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
);

export function searchPublisherCycleReducer(state: SearchPublisherCycle, action: Action) {
    return reducer(state, action);
}
