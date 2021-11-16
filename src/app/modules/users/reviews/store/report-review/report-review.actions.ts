import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ReportReview } from '../../../../api/reviews/models/report-review.model';
import { Review } from '../../../../api/reviews/models/review.model';

export const REPORT_REVIEW = createAction('[REVIEWS] Report review', props<{ payload: { review: Review, userId: number, reportReview: ReportReview } }>());
export const REPORT_REVIEW_SUCCESS = createAction('[REVIEWS] Report review success');
export const REPORT_REVIEW_FALIURE = createAction('[REVIEWS] Report review faliure', props<{ payload: { model: ApiError } }>());
