import { Action, createReducer, on } from "@ngrx/store";
import { ToggleOptions } from "../../common/book-page-sections";
import * as fromActions from './add-book-page.actions';


export interface AddBookPageState {
  toggleOptions: { [optionId: number]: boolean };
}

const initialState: AddBookPageState = {
  toggleOptions: {
    [ToggleOptions.basics]: true,
    [ToggleOptions.description]: true,
    [ToggleOptions.series]: true,
    [ToggleOptions.details]: true,
    [ToggleOptions.cover]: true
  }
};

const reducer = createReducer(initialState,
  on(fromActions.TOGGLE_ADD_BOOK_PAGE_SECTION, (state, action) => {
    let current = state.toggleOptions[action.payload.optionId];
    current = !current;
    state.toggleOptions[action.payload.optionId] = current;

    return { ...state, toggleOptions: state.toggleOptions }
  })
);

export function addBookPageReducer(state: AddBookPageState, action: Action) {
  return reducer(state, action);
}
