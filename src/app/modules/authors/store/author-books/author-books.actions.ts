import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { AuthorBooksPageQuery } from "../../models/author-books-page.model";

export const SELECT_AUTHOR_BOOKS = createAction('[AUTHORS] Select author books', props<{ payload: { query: AuthorBooksPageQuery } }>());
export const FETCH_AUTHOR_BOOKS = createAction('[AUTHORS] Fetch author books', props<{ payload: { pageResult: PageResult } }>());
export const FETCH_AUTHOR_BOOKS_ERROR = createAction('[AUTHORS] Fetch author books error', props<{ payload: { error: ApiError } }>());
