import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, OrderedQuery } from "../../shared/common/query";
import { SortType } from "../../shared/common/sort-type";
import { SORT_QUOTES_BY_LIKES } from "./quotes-sort-type";


export const QUOTES_PAGE_QUERY = (count?: number, page?: number, descending?: boolean, sortType?: SortType, title?: string) => {
  const query: OrderedQuery = {
    value: title === undefined ? '' : title,
    page: page ? page : DEFAULT_PAGE,
    count: count ? count : DEFAULT_ITEMS_COUNT,
    descending: descending === undefined ? true : descending,
    sortType: sortType === undefined ? SORT_QUOTES_BY_LIKES : sortType,

  }

  return query;
};
