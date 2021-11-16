import { environment } from 'src/environments/environment';

export const GET_BOOK_GROUPED_RATINGS = (bookId: number) => `${environment.api}/ratings/books/${bookId}/grouped`;
export const GET_USER_BOOK_RATING = (bookId: number, userId: number) => `${environment.api}/ratings/reader/${userId}/books/${bookId}`;
export const GET_USER_RATINGS = (userId: number, page: number, count: number) => `${environment.api}/ratings/reader/${userId}/${page}/${count}`;
export const GET_MULTIPLE_RATINGS = (userId: number) => `${environment.api}/ratings/reader/${userId}`;


