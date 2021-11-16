import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, OrderedQuery } from 'src/app/modules/shared/common/query';
import { SortType } from 'src/app/modules/shared/common/sort-type';
import { SORT_REVIEWS_BY_DATE } from '../models/reviews-sort-type';

export const REVIEWS_QUERY = (currentPage?: number, descending?: boolean, sortType?: SortType, count?: number) => {
  const query: OrderedQuery = {
    value: '',
    page: currentPage ? currentPage : DEFAULT_PAGE,
    count: count ? count : DEFAULT_ITEMS_COUNT,
    sortType: sortType ? sortType : SORT_REVIEWS_BY_DATE,
    descending: descending === undefined ? true : descending
  };

  return query;
}
