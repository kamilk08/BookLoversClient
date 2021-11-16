import { SortType } from './sort-type';

export const DEFAULT_PAGE = 0;
export const DEFAULT_ITEMS_COUNT = 10;

export interface Query {
  value: string
  page: number
  count: number
  sortType?: SortType,
}

export interface ResultsOrder {
  sortType: number,
  descending: boolean
}

export interface OrderedQuery extends Query {
  descending: boolean
}

export const SEARCH_QUERY = (value: string, page?: number, count?: number) => {
  const query: Query = {
    value: value ? value : '',
    page: page ? page : DEFAULT_PAGE,
    count: count ? count : DEFAULT_ITEMS_COUNT
  };
  return query;
};

export const DEFAULT_QUERY = (page?: number, count?: number) => {
  const query: Query = {
    value: '',
    page: page ? page : DEFAULT_PAGE,
    count: count ? count : DEFAULT_ITEMS_COUNT
  };
  return query;
};




