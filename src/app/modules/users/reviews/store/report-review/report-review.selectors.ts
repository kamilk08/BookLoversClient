import { createSelector } from "@ngrx/store";
import { reviewsModuleState, ReviewsModuleState } from "..";
import { ReportReviewState } from "./report-review.reducer";

const reviewReportState = createSelector(reviewsModuleState, (state: ReviewsModuleState) => {
  if (state) return state.reviewReports;

  return undefined;
});

export const reportedReview = createSelector(reviewReportState, (state: ReportReviewState) => {
  if (state) return state.review;

  return undefined;
});
