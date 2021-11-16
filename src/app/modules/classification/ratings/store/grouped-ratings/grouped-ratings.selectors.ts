import { createSelector } from "@ngrx/store";
import { ratingsState, RatingsState } from "..";
import { GroupedRatings } from "./grouped-ratings.reducer";

const groupedRatingsState = createSelector(ratingsState, (state: RatingsState) => {
  if (state) return state.groupedRatings;

  return undefined;
});

export const getBookGroupedRatings = (bookId: number) => createSelector(groupedRatingsState, (state: GroupedRatings) => {
  if (state && bookId) {
    const bookGroupedRatings = state.entities[bookId];
    return bookGroupedRatings;
  }

  return undefined;
});
