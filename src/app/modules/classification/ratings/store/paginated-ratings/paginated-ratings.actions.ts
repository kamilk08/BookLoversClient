import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';
import { Rating } from '../../../../api/ratings/models/rating.model';

export const SELECT_PAGINATED_USER_RATINGS = createAction('[RATINGS] Select user ratings', props<{ payload: { userId: number, query: Query } }>());
export const FETCH_PAGINATED_USER_RATINGS = createAction('[RATINGS] Fetch user ratings', props<{ payload: { pageResult: PageResult, ratings: Rating[] } }>());
export const FETCH_PAGINATED_USER_FALIURE = createAction('[RATINGS] Fetch pagiated users faliure', props<{ payload: { error: ApiError } }>());
