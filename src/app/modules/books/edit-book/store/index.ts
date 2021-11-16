import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from "@ngrx/store";
import { EditBookFormState } from "./edit-book-form.reducer";
import { EditBookPageState } from "./edit-book-page.reducer";
import { ProcessEditedBook } from "./edit-book.reducer";

import * as fromProcessEditedBook from './edit-book.reducer';
import * as fromEditBookForm from './edit-book-form.reducer';
import * as fromEditBookPageActions from './edit-book-page.reducer';

export interface EditBookState {
  processEditBookState: ProcessEditedBook,
  editBookFormState: EditBookFormState,
  editBookPageState: EditBookPageState
}

const reducerMap: ActionReducerMap<EditBookState> = {
  processEditBookState: fromProcessEditedBook.editBookReducer,
  editBookFormState: fromEditBookForm.editBookFormReducer,
  editBookPageState: fromEditBookPageActions.addBookPageReducer
}

const moduleReducer = combineReducers(reducerMap);

export function editBookModuleReducer(state: EditBookState, action: Action) {
  return moduleReducer(state, action);
}

export const editBookModuleState = createFeatureSelector('edit-book');
