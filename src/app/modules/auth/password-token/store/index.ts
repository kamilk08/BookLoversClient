import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromGenerateToken from '../store/generate-token.reducer';

export interface GenerateTokenModuleState {
  generatePasswordToken: fromGenerateToken.GenerateTokenState
};

const reducersMap: ActionReducerMap<GenerateTokenModuleState> = {
  generatePasswordToken: fromGenerateToken.generateTokenReducer
};

const moduleReducer = combineReducers(reducersMap);

export function generateTokenModuleReducer(state: GenerateTokenModuleState, action: Action) {
  return moduleReducer(state, action);
};

export const generateTokenState = createFeatureSelector('generate-token');

