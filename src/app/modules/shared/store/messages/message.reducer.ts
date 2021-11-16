import { Action, createReducer, on } from '@ngrx/store';
import { SHOW_SUCCESS_MESSAGE, SHOW_FALIURE_MESSAGE } from './actions';

export interface MessageState {
  currentMessageId: any
}

export const initialState: MessageState = {
  currentMessageId: undefined
}


const reducer = createReducer(initialState,
  on(SHOW_SUCCESS_MESSAGE, (state) => {
    return { ...state }
  }),
  on(SHOW_FALIURE_MESSAGE, (state) => {
    return { ...state }
  })
)

export function messageReducer(state: MessageState, action: Action) {
  return reducer(state, action);
}

