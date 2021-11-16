import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './publisher.actions';
import { fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import { Publisher } from 'src/app/modules/api/publishers/models/publisher.model';


export interface PublishersState {
  entities: { [id: number]: Publisher },
  ids: number[],
  processing: boolean,
  error: any
}

const initialState: PublishersState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_PUBLISHER, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_PUBLISHER_BY_BOOK, state => ({ ...state, processing: true })),
  on(fromActions.FETCH_PUBLIHSER, (state, action) => {
    const newState = fetchSingle((publisher: Publisher) => publisher.identification.id, state, action.payload.publisher);

    return { ...state, processing: false, entities: newState.entities, ids: newState.ids }
  }),
  on(fromActions.PUBLISHER_NOT_FOUND, (state, action) => ({ ...state, processing: false, error: action.payload.model })),
  on(fromActions.FETCH_PUBLISHER_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model })))

export function publisherReducer(state: PublishersState, action: Action) {
  return reducer(state, action);
}
