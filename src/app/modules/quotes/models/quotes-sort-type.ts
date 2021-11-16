import { SortType } from "../../shared/common/sort-type";

export class QuotesSortType extends SortType {
  constructor(value: number, name: string) {
    super(value, name)
  }
}

export const SORT_QUOTES_BY_ID: QuotesSortType = new SortType(1, "SORT_BY_ID");
export const SORT_QUOTES_BY_LIKES: QuotesSortType = new SortType(2, "SORT_BY_LIKES");
