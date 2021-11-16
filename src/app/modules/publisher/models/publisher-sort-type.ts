import { SortType } from "../../shared/common/sort-type";

export class PublisherSortType extends SortType {
  constructor(value: number, name: string) {
    super(value, name)
  }
}

export const SORT_PUBLISHER_BOOKS_BY_TITLE: PublisherSortType = new SortType(1, "SORT_BY_TITLE");
export const SORT_PUBLISHER_BOOKS_BY_AVERAGE: PublisherSortType = new SortType(2, "SORT_BY_AVERAGE");
export const SORT_PUBLISHER_BOOKS_BY_DATE: PublisherSortType = new SortType(3, "SORT_BY_DATE");
