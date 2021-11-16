import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, OrderedQuery } from "../../shared/common/query";
import { SortType } from "../../shared/common/sort-type";
import { SORT_PUBLISHER_BOOKS_BY_TITLE } from "./publisher-sort-type";

export interface PublisherBooksPageQuery extends OrderedQuery {
  publisherId: number
}

export const PUBLISHER_BOOKS_PAGE_QUERY = (publisherId: number, count?: number, page?: number, descending?: boolean, sortType?: SortType, title?: string) => {
  const query: PublisherBooksPageQuery = {
    value: title === undefined ? '' : title,
    page: page ? page : DEFAULT_PAGE,
    count: count ? count : DEFAULT_ITEMS_COUNT,
    descending: descending === undefined ? true : descending,
    sortType: sortType === undefined ? SORT_PUBLISHER_BOOKS_BY_TITLE : sortType,
    publisherId: publisherId
  }

  return query;
};
