import { SortType } from "src/app/modules/shared/common/sort-type";

export class ReviewsSortType extends SortType {
  constructor(value: number, name: string) {
    super(value, name)
  }
}

export const SORT_REVIEWS_BY_DATE: ReviewsSortType = new SortType(1, "SORT_BY_DATE");
export const SORT_REVIEWS_BY_LIKES: ReviewsSortType = new SortType(2, "SORT_BY_LIKES");
