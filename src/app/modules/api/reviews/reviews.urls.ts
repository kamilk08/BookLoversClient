import { OrderedQuery } from 'src/app/modules/shared/common/query';
import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';

export const SELECT_USER_BOOK_REVIEW = (readerId: number, bookId: number) => `${environment.api}/reviews/reader/${readerId}/book/${bookId}`;
export const SELECT_BOOK_REVIEWS = (bookId: number, query: OrderedQuery) => `${environment.api}/reviews/book/${bookId}/${query.page}/${query.count}/${query.sortType.value}/${query.descending}`;
export const SELECT_READER_REVIEWS_IDS = (readerId: number, query: OrderedQuery) => `${environment.api}/reviews/reader/${readerId}/ids/${query.page}/${query.count}/${query.sortType.value}/${query.descending}`;
export const SELECT_READER_REVIEWS_LIST = (readerId: number, query: OrderedQuery) =>`${environment.api}/reviews/reader/${readerId}/list/${query.page}/${query.count}/${query.sortType.value}/${query.descending}`;

export const ADD_NEW_REVIEW = `${environment.api}/reviews`;
export const EDIT_REVIEW = `${environment.api}/reviews`;
export const LIKE_REVIEW = (reviewGuid: UUID) => `${environment.api}/reviews/${reviewGuid}/like`;
export const UNLIKE_REVIEW = (reviewGuid: UUID) => `${environment.api}/reviews/${reviewGuid}/like`;
export const ADD_SPOILER_TAG = (reviewGuid: UUID) => `${environment.api}/reviews/${reviewGuid}/spoiler`;
export const REMOVE_SPOILER_TAG = (reviewGuid: UUID) => `${environment.api}/reviews/${reviewGuid}/spoiler`;
export const REPORT_REVIEW = `${environment.api}/reviews/report`;
export const REMOVE_REVIEW = (reviewGuid: UUID) => `${environment.api}/reviews/${reviewGuid}`
