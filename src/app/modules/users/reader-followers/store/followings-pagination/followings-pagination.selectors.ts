import { createSelector } from "@ngrx/store";
import { ReaderFollowersModuleState, readerFollowersState } from '..';
import { ReaderFollowingsPaginationState } from './followings-pagination.reducer';

const followingsPaginationState = createSelector(readerFollowersState, (state: ReaderFollowersModuleState) => state.followingsPaginationState);

export const followingsPageResult = (readerId: number) => createSelector(followingsPaginationState, (state: ReaderFollowingsPaginationState) => {
  if (readerId) {
    return state.entities[readerId];
  }

  return undefined;
});

export const currentFollowingsPage = (readerId: number) => createSelector(followingsPageResult(readerId), state => {
  if (state && readerId) {
    return state.page + 1;
  }

  return undefined;
});

export const followingsTotalItems$ = (readerId: number) => createSelector(followingsPageResult(readerId), (state) => {
  if (state && readerId) {
    return state.totalItems;
  }

  return undefined;
})



export const processingPage = createSelector(followingsPaginationState, (state: ReaderFollowingsPaginationState) => state.processing);

