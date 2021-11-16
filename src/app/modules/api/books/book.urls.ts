import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';
import { Query } from '../../shared/common/query';

export const GET_BOOK_BY_ID = (id: number) => `${environment.api}/books/${id}`;
export const GET_BOOK_BY_GUID = (guid: UUID) => `${environment.api}/books/${guid}`
export const SEARCH_BOOK = (query: string, page: number, count: number) => `${environment.api}/books/filters/${query}/${page}/${count}`;
export const SELECT_BOOKS_PAGE = (query: Query) => `${environment.api}/books/${query.page}/${query.count}`
export const GET_MULTIPLE_BOOKS_BY_ID = `${environment.api}/books/list/ids`;
export const GET_MULTIPLE_BOOKS_BY_GUID = `${environment.api}/books/list/guides`;
