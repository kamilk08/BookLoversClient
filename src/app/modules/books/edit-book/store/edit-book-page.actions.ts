import { createAction, props } from "@ngrx/store";

export const TOGGLE_EDIT_BOOK_PAGE_SECTION = createAction('[EDIT_BOOK] Toggle edit book page section', props<{ payload: { optionId: number } }>());
