import { ProcessBookState } from "./process-book.reducer";
import { NewBookFormState } from "./new-book-form.reducer";
import { AddBookPageState } from "./add-book-page.reducer";

import * as fromProcessBookState from './process-book.reducer';
import * as fromNewBookFormState from './new-book-form.reducer';
import * as fromAddBookPageState from './add-book-page.reducer';
import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from "@ngrx/store";

export interface AddBookState {
  processBookState: ProcessBookState,
  newBookFormState: NewBookFormState,
  addBookPageState: AddBookPageState,
}

const reducerMap: ActionReducerMap<AddBookState> = {
  processBookState: fromProcessBookState.addBookReducer,
  newBookFormState: fromNewBookFormState.newBookFormReducer,
  addBookPageState: fromAddBookPageState.addBookPageReducer
};

const reducer = combineReducers(reducerMap);

export function addBookStateReducer(state: AddBookState, action: Action) {
  return reducer(state, action);
}

export const addBookModuleState = createFeatureSelector<AddBookState>('add-book');
