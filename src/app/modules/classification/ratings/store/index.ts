import * as fromUserRatings from './ratings.reducer';
import * as fromGroupedRatings from "../store/grouped-ratings/grouped-ratings.reducer";
import * as fromPaginatedRatings from "./paginated-ratings/paginated-ratings.reducer";
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';

export interface RatingsState {
  ratings: fromUserRatings.Ratings
  groupedRatings: fromGroupedRatings.GroupedRatings,
  paginatedRatings: fromPaginatedRatings.PaginatedRatings
}

const reducerMap: ActionReducerMap<RatingsState> = {
  ratings: fromUserRatings.ratingsReducer,
  groupedRatings: fromGroupedRatings.groupedRatingsReducer,
  paginatedRatings: fromPaginatedRatings.paginatedRatingsReducer
};

const reducer = combineReducers(reducerMap);

export function ratingsStateReducer(state: RatingsState, action: Action) {
  return reducer(state, action);
}

export const ratingsState = createFeatureSelector('ratings');
