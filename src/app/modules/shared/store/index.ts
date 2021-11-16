import * as fromMessages from './messages/message.reducer';
import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import { MessageEffects } from './messages/message.effects';

export interface SharedModuleState {
  messagesState: fromMessages.MessageState
}

export const moduleReducers: ActionReducerMap<SharedModuleState> = {
  messagesState: fromMessages.messageReducer
}


const moduleReducer = combineReducers(moduleReducers);

const moduleSelector = createFeatureSelector('sharedModule');

export function sharedModuleReducer(state: SharedModuleState, action: Action) {
  return moduleReducer(state, action);
}
