import { SortType } from "src/app/modules/shared/common/sort-type";

export class SeriesSortType extends SortType {
  constructor(value: number, name: string) {
    super(value, name)
  }
}

export const SORT_SERIES_BOOKS_BY_TITLE: SeriesSortType = new SortType(1, "SORT_BY_TITLE");
export const SORT_SERIES_BOOKS_BY_AVERAGE: SeriesSortType = new SortType(2, "SORT_BY_AVERAGE");
export const SORT_SERIES_BOOKS_BY_POSITION:SeriesSortType = new SortType(3,"SORT_BY_POSITION_IN_SERIES");
