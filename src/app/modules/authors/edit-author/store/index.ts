import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromEditAuthor from './edit-author-state/edit-author.reducer';
import * as fromEditAuthorModal from './edit-author-modal-state/edit-author-modal.reducer';

export interface EditAuthorModuleState {
  editAuthor: fromEditAuthor.EditAuthorState,
  editAuthorModal: fromEditAuthorModal.EditAuthorModalState
}


const reducerMap: ActionReducerMap<EditAuthorModuleState> = {
  editAuthor: fromEditAuthor.editAuthorReducer,
  editAuthorModal: fromEditAuthorModal.editAuthorModalReducer
};

const reducer = combineReducers(reducerMap);

export function editAuthorModuleReducer(state: EditAuthorModuleState, action: Action) {
  return reducer(state, action);
}

export const editAuthorModuleSelector = createFeatureSelector('edit-author');
