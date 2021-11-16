import { SortType } from './sort-type';

export interface PageResult {
  page: number
  pagesCount: number
  totalItems: number
  items: any[],
}

export interface OrderedPageResult extends PageResult {
  sortType: SortType
  sortOrder: boolean
}

export interface ReviewsPageResult extends OrderedPageResult {
  withContent: boolean
}

export const INITIAL_PAGE= 1;
