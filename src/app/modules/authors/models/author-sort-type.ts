import { SortType } from "../../shared/common/sort-type";

export class AuthorSortType extends SortType {
  constructor(value: number, name: string) {
    super(value, name)
  }
}

export const SORT_AUTHOR_BOOKS_BY_TITLE: AuthorSortType = new SortType(1, "SORT_BY_TITLE");
export const SORT_AUTHOR_BOOKS_BY_AVERAGE: AuthorSortType = new SortType(2, "SORT_BY_AVERAGE");
