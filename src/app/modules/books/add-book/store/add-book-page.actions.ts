import { createAction, props } from "@ngrx/store";

export const TOGGLE_ADD_BOOK_PAGE_SECTION = createAction('[ADD_BOOK] Toggle add book page section', props<{ payload: { optionId: number } }>());
