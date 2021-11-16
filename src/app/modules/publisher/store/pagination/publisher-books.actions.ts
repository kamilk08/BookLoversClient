import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { PublisherBooksPageQuery } from "../../models/publisher-books-page.query";

export const SELECT_PUBLISHER_BOOKS = createAction('[PUBLISHER] Select publisher books', props<{ payload: { query: PublisherBooksPageQuery } }>());
export const FETCH_PUBLISHER_BOOKS = createAction('[PUBLISHER] Fetch publisher books', props<{ payload: { pageResult: PageResult } }>());
export const FETCH_PUBLISHER_BOOKS_ERROR = createAction('[PUBLISHER] Fetch publisher books error', props<{ payload: { error: ApiError } }>());
