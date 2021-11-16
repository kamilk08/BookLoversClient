import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/modules/api/books/models";
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { RatingsOverview } from "src/app/modules/api/ratings/models/ratings-overview.model";
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { Bookcase } from "../../../models";

export const SUBMIT_BOOKCASE_PREVIEW_FORM = createAction('[BOOKCASE_PREVIEW] Submit bookcase preview form', props<{ payload: { ratingsOverview: RatingsOverview, book: Book, bookcase: Bookcase } }>());

export const REVIEW_ADDED = createAction('[BOOKCASE_PREVIEW] Review added', props<{ payload: { book: Book } }>());
export const REVIEW_CHANGED = createAction('[BOOKCASE_PREVIEW] Review changed');
export const RATING_ADDED = createAction('[BOOKCASE_PREVIEW] Rating added', props<{ payload: { book: Book, bookcase: Bookcase } }>());
export const RATING_CHANGED_OR_REMOVED = createAction('[BOOKCASE_PREVIEW] Rating changed or removed', props<{ payload: { ratingsOverview: RatingsOverview } }>());
export const RATING_REMOVED = createAction('[BOOKCASE_PREVIEW] Rating removed', props<{ payload: { ratingsOverview: RatingsOverview } }>());
export const RATING_CHANGED = createAction('[BOOKCASE_PREVIEW] Rating changed', props<{ payload: { ratingsOverview: RatingsOverview } }>());

export const UPDATE_REVIEW_FORM = createAction('[BOOKCASE_PREVIEW] Update review form', props<{ payload: { review: Review } }>());
export const UPDATE_REVIEW_FORM_VALIDITY = createAction('[BOOKCASE_PREVIEW] Update review form validity')
export const SET_NO_REVIEW = createAction('[BOOKCASE_PREVIEW] Set no review');

export const UPDATE_RATING_FORM = createAction('[BOOKCASE_PREVIEW] Update rating form', props<{ payload: { rating: Rating } }>());

export const RESET_REVIEW_FORM = createAction('[BOOKCASE_PREVIEW] Reset review form');
export const RESET_RATING_FORM = createAction('[BOOKCASE_PREVIEW] Reset rating form');

export const NO_ACTION = createAction('[BOOKCASE_PREVIEW] No action');
