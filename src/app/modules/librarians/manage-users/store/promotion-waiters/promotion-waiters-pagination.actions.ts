import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { Query } from "src/app/modules/shared/common/query";

export const SELECT_PROMOTION_WAITERS_PAGE = createAction('[MANAGE_LIBRARIANS] Select promotion waiters page', props<{ payload: { ids: number[], query: Query } }>());
export const FETCH_PROMOTION_WAITERS_PAGE = createAction('[MANAGE_LIBRARIANS] Fetch promotion waiters page', props<{ payload: { result: PageResult } }>());
export const SELECT_PROMOTION_WAITERS_ERROR = createAction('[MANAGE_LIBRARIANS] Select promotions waiters error', props<{ payload: { error: ApiError } }>());
