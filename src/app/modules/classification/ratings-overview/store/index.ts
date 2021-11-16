import * as fromRatingOverviews from './ratings-overview.reducer';
import * as fromAddRating from './add-rating/add-rating.reducer';
import * as fromEditRating from './edit-rating/edit-rating.reducer';
import * as fromRemoveRating from './remove-rating/remove-rating.reducer';
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';

export interface RatingOverviewsState {
  addRating: fromAddRating.AddRatingState,
  editRating: fromEditRating.EditRatingState,
  removeRating: fromRemoveRating.RemoveRatingState,
  ratingOverviews: fromRatingOverviews.RatingsOverviews,
}


const reducersMap: ActionReducerMap<RatingOverviewsState> = {
  addRating: fromAddRating.addRatingReducer,
  editRating: fromEditRating.editRatingReducer,
  removeRating: fromRemoveRating.removeRatingReducer,
  ratingOverviews: fromRatingOverviews.overviewReducer,
}

const redcuer = combineReducers(reducersMap);

export function ratingsOverviewReducer(state: RatingOverviewsState, action: Action) {
  return redcuer(state, action);
}

export const ratingOverviewsState = createFeatureSelector('ratings-overview');
