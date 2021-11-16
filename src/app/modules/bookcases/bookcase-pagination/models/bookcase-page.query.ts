import { DEFAULT_PAGE, DEFAULT_ITEMS_COUNT, OrderedQuery } from '../../../shared/common/query';
import { BookcaseSortType, SORT_BOOKCASE_BY_DATE } from '../../models/bookcase-sort-type';

export interface BookcasePageQuery extends OrderedQuery {
  shelfIds: number[]
  filteredBookIds: number[],
  title: string
}

export const BOOKCASE_PAGE_QUERY = (count?: number, page?: number, descending?: boolean, shelvesIds?: number[], filteredBookIds?: number[], sortType?: BookcaseSortType, title?: string) => {
  const query: BookcasePageQuery = {
    value: '',
    page: page ? page : DEFAULT_PAGE,
    count: count ? count : DEFAULT_ITEMS_COUNT,
    descending: descending ? true : false,
    sortType: sortType ? sortType : SORT_BOOKCASE_BY_DATE,
    shelfIds: shelvesIds ? shelvesIds : [],
    filteredBookIds: filteredBookIds ? filteredBookIds : [],
    title: title === undefined ? '' : title
  }

  return query;
};

export const DEFAULT_BOOKCASE_PAGE_QUERY = () => {
  const query: BookcasePageQuery = {
    value: '',
    page: DEFAULT_PAGE,
    count: DEFAULT_ITEMS_COUNT,
    descending: true,
    sortType: SORT_BOOKCASE_BY_DATE,
    shelfIds: [],
    filteredBookIds: [],
    title: ''
  };

  return query;
}
