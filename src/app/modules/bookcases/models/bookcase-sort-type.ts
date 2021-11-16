import { SortType } from "../../shared/common/sort-type";

export class BookcaseSortType extends SortType {
  constructor(value: number, name: string) {
    super(value, name)
  }
}

export const SORT_BOOKCASE_BY_DATE: BookcaseSortType = new SortType(1, "SORT_BY_DATE");
export const SORT_BOOKCASE_BY_BOOK_AVERAGE: BookcaseSortType = new SortType(2, "SORT_BY_AVERAGE");
