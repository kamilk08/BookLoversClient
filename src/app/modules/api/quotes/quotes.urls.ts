import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';

export const ADD_BOOK_QUOTE = `${environment.api}/quotes/book`;
export const ADD_AUTHOR_QUOTE = `${environment.api}/quotes/author`;

export const GET_QUOTE = (quoteId: number) => `${environment.api}/quotes/${quoteId}`;
export const GET_BOOK_QUOTES = (bookId: number, page: number, count: number, order: number, descending: boolean) => `${environment.api}/quotes/book/${bookId}/${page}/${count}/${order}/${descending}`;
export const GET_AUTHOR_QUOTES = (authorId: number, page: number, count: number, order: number, descending: boolean) => `${environment.api}/quotes/author/${authorId}/${page}/${count}/${order}/${descending}`;
export const GET_READER_QUOTES = (readerId: number, page: number, count: number, order: number, descending: boolean) => `${environment.api}/quotes/reader/${readerId}/${page}/${count}/${order}/${descending}`;
export const LIKE_QUOTE = (guid: UUID) => `${environment.api}/quotes/${guid}/like`;
export const UNLIKE_QUOTE = (guid: UUID) => `${environment.api}/quotes/${guid}/like`;
