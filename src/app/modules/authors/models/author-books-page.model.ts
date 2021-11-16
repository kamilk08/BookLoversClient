import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, OrderedQuery } from "src/app/modules/shared/common/query";
import { SortType } from "src/app/modules/shared/common/sort-type";
import { SORT_AUTHOR_BOOKS_BY_TITLE } from "./author-sort-type";

export interface AuthorBooksPageQuery extends OrderedQuery {
  authorId: number
}

export const AUTHOR_BOOKS_PAGE_QUERY = (authorId: number, count?: number, page?: number, descending?: boolean, sortType?: SortType, title?: string) => {
  const query: AuthorBooksPageQuery = {
    value: title === undefined ? '' : title,
    page: page ? page : DEFAULT_PAGE,
    count: count ? count : DEFAULT_ITEMS_COUNT,
    descending: descending === undefined ? true : descending,
    sortType: sortType === undefined ? SORT_AUTHOR_BOOKS_BY_TITLE : sortType,
    authorId: authorId
  }

  return query;
};
