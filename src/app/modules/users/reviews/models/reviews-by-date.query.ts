import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, OrderedQuery } from 'src/app/modules/shared/common/query';
import { SORT_REVIEWS_BY_DATE } from './reviews-sort-type';

export const DATE_REVIEWS_QUERY = (count?: number, descending?: boolean) => {
  const query: OrderedQuery = {
    value: '',
    page: DEFAULT_PAGE,
    count: count ? count : DEFAULT_ITEMS_COUNT,
    sortType: SORT_REVIEWS_BY_DATE,
    descending: descending === undefined ? true : descending
  };
  return query;
}
