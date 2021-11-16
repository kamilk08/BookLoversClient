import { createSelector } from "@ngrx/store";
import { readerStatisticsModuleSelector, ReaderStatisticsModuleState } from "..";
import { readerRatingsStatistics } from "../ratings-statistics/ratings-statistics.selectors";
import { ReaderStatisticsState } from "./reader-statistics.reducer";

const readerStatisticsState = createSelector(readerStatisticsModuleSelector, (state: ReaderStatisticsModuleState) => {
  if (state) return state.statistics;

  return undefined;
});

export const readerStatistics = (readerId: number) => createSelector(readerStatisticsState, (state: ReaderStatisticsState) => {
  if (state && readerId) {
    return state.entities[readerId];
  }

  return undefined;
});

export const userBooksInBookcase = (readerId: number) => createSelector(readerStatistics(readerId), (state) => {
  if (state) return state.booksCount;

  return undefined;
});

export const userShelves = (readerId: number) => createSelector(readerStatistics(readerId), (state) => {
  if (state) return state.shelvesCount;

  return undefined;
});

export const userReviews = (readerId: number) => createSelector(readerStatistics(readerId), (state) => {
  if (state) return state.reviewsCount;

  return undefined;
});

export const givenLikes = (readerId: number) => createSelector(readerStatistics(readerId), (state) => {
  if (state) return state.givenLikes;

  return undefined;
});

export const addedBooks = (readerId: number) => createSelector(readerStatistics(readerId), (state) => {
  if (state) return state.addedBooks;

  return undefined;
});

export const addedAuthors = (readerId: number) => createSelector(readerStatistics(readerId), (state) => {
  if (state) return state.addedAuthors;

  return undefined;
});

export const addedQuotes = (readerId: number) => createSelector(readerStatistics(readerId), (state) => {
  if (state) return state.addedQuotes;

  return undefined;
});

export const addedRatings = (readerId: number) => createSelector(readerRatingsStatistics(readerId), (state) => {
  if (state) return state.ratingsCount;

  return undefined;
});

export const sumOfFollwersAndFollowings = (readerId: number) => createSelector(readerStatistics(readerId), (state) => {
  if (state) return state.followings + state.followers;

  return undefined;
})
