import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { SeriesBooksPageQuery } from "../../index/models/series-books-page.query";

export const SELECT_SERIES_BOOKS = createAction('[SERIES] Select series books', props<{ payload: { query: SeriesBooksPageQuery } }>());
export const FETCH_SERIES_BOOKS = createAction('[SERIES] Fetch series books ids', props<{ payload: { pageResult: PageResult } }>());
export const FETCH_SERIES_BOOKS_ERROR = createAction('[SERIES] Fetch series books error', props<{ payload: { error: ApiError } }>());
