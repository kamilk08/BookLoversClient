import * as fromAction from './author.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { fetchSingle, fetchMany, removeEntity, hasEntity } from 'src/app/modules/shared/common/store-extensions';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';

export interface AuthorsState {
  entities: { [id: number]: Author | undefined }
  ids: number[],
  processing: boolean
  error: any
}

const initialState: AuthorsState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromAction.SELECT_AUTHOR, state => ({ ...state, processing: true })),
  on(fromAction.SELECT_MULTIPLE_AUTHORS_BY_IDS, state => ({ ...state, processing: true })),
  on(fromAction.SELECT_AUTHOR_BY_GUID, (state) => ({ ...state, processing: true })),
  on(fromAction.FETCH_AUTHOR, (state, action) => {
    const newState = fetchSingle((author: Author) => author.identification.id, state, action.payload.author);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromAction.FETCH_MULTIPLE_AUTHORS, (state, action) => {
    const newState = fetchMany((author: Author) => author.identification.id, state, action.payload.authors);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromAction.FETCH_AUTHOR_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  }),
  on(fromAction.AUTHOR_NOT_FOUND, (state, action) => {

    return { ...state, error: action.payload.model };
  }),
  on(fromAction.ADD_OR_UPDATE_AUTHOR, (state, action) => {
    if (!hasEntity(state, action.payload.authorId))
      state.ids.push(action.payload.authorId);

    const author: Author = action.payload.author;
    author.setAuthorId(action.payload.authorId);

    return { ...state, entities: { ...state.entities, [action.payload.authorId]: author }, ids: state.ids }
  }),
  on(fromAction.DELETE_AUTHOR, (state, action) => {
    const newState = removeEntity(state, action.payload.authorId);
    return { ...state, entities: newState.entities, ids: newState.ids }
  }),
);

export function authorReducer(state: AuthorsState, action: Action) {
  return reducer(state, action);
}


