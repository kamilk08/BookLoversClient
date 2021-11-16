import * as fromRemoveBookFromShelf from './remove-book-from-shelf.reducer';
import * as fromRemoveBookFromBookcase from './remove-book-from-bookcase.reducer';
import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';


export interface RemoveBookcaseBookState {
  removeBookFromShelfState: fromRemoveBookFromShelf.RemoveBookFromShelfState,
  removeBookFromBookcaseState: fromRemoveBookFromBookcase.RemoveBookFromBookcaseState
};

const reducerMap: ActionReducerMap<RemoveBookcaseBookState> = {
  removeBookFromShelfState: fromRemoveBookFromShelf.removeBookFromShelfReducer,
  removeBookFromBookcaseState: fromRemoveBookFromBookcase.removeBookFromBookcaseReducer
};

const reducer = combineReducers(reducerMap);

export function removeBookcaseBookReducer(state: RemoveBookcaseBookState, action: Action) {
  return reducer(state, action);
};

export const baseSelector = createFeatureSelector('remove-bookcase-book');

