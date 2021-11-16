import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, OrderedQuery } from "src/app/modules/shared/common/query";
import { SortType } from "src/app/modules/shared/common/sort-type";
import { SORT_SERIES_BOOKS_BY_TITLE } from "./series-sort-type";

export interface SeriesBooksPageQuery extends OrderedQuery {
  seriesId: number
}

export const SERIES_BOOKS_PAGE_QUERY = (seriesId: number, count?: number, page?: number, descending?: boolean, sortType?: SortType, title?: string) => {
  const query: SeriesBooksPageQuery = {
    value: title === undefined ? '' : title,
    page: page ? page : DEFAULT_PAGE,
    count: count ? count : DEFAULT_ITEMS_COUNT,
    descending: descending === undefined ? true : descending,
    sortType: sortType === undefined ? SORT_SERIES_BOOKS_BY_TITLE : sortType,
    seriesId: seriesId
  }

  return query;
};
