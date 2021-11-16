import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Author } from '../../../../api/authors/authors/models/author.model';
import * as fromActions from './edit-author.actions';

export interface EditAuthorState {
  editedAuthor: Author,
  oldAuthor: Author,
  processing: boolean,
  error: ApiError
}

const inititalState: EditAuthorState = {
  editedAuthor: undefined,
  oldAuthor: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(inititalState,
  on(fromActions.EDIT_AUTHOR, (state, action) => {
    return { ...state, editedAuthor: action.payload.author, oldAuthor: action.payload.oldAuthor, processing: true }
  }),
  on(fromActions.EDIT_AUTHOR_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromActions.EDIT_AUTHOR_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);


export function editAuthorReducer(state: EditAuthorState, action: Action) {
  return reducer(state, action);
}
