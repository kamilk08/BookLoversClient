import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromAddAuthor from './add-author-state/add-author.reducer';
import * as fromAddAuthorModal from './add-author-modal-state/add-author-modal.reducer';

export interface AddAuthorModuleState {
  addAuthor: fromAddAuthor.AddAuthorState,
  addAuthorModal: fromAddAuthorModal.AddAuthorModalState
};


const reducerMap: ActionReducerMap<AddAuthorModuleState> = {
  addAuthor: fromAddAuthor.addAuthorReducer,
  addAuthorModal: fromAddAuthorModal.addAuthorModalReducer
};

const reducer = combineReducers(reducerMap);

export function addAuthorStateReducer(state: AddAuthorModuleState, action: Action) {
  return reducer(state, action);
};

export const addAuthorModuleState = createFeatureSelector('add-author');
