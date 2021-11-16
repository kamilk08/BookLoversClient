import { createAction, props } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { ApiError } from "src/app/modules/api/api-error.model";
import { Book } from "src/app/modules/api/books/models";

export const REMOVE_BOOK = createAction('[REMOVE_BOOK] Remove book', props<{ payload: { book: Book } }>());
export const REMOVE_BOOK_SUCCESS = createAction('[REMOVE_BOOK] Remove book success', props<{ payload: { guid: UUID } }>());
export const REMOVE_BOOK_FALIURE = createAction('[REMOVE_BOOK] Remove book faliure', props<{ payload: { model: ApiError } }>());
