import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, OrderedQuery } from 'src/app/modules/shared/common/query';
import { SORT_REVIEWS_BY_LIKES } from '../models/reviews-sort-type';

export const LIKES_REVIEWS_QUERY = (currentPage?: number, descending?: boolean) => {
  const query: OrderedQuery = {
    value: '',
    page: currentPage ? currentPage : DEFAULT_PAGE,
    count: DEFAULT_ITEMS_COUNT,
    sortType: SORT_REVIEWS_BY_LIKES,
    descending: descending === undefined ? true : descending
  };
  return query;
}
