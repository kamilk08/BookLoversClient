import { environment } from 'src/environments/environment';

export const GET_BOOK_RATINGS_OVERVIEW = (bookId: number) => `${environment.api}/ratings/book/${bookId}`;
export const GET_MULTIPLE_OVERVIEWS = `${environment.api}/ratings/books`;

export const ADD_BOOK_RATING = `${environment.api}/ratings`;
export const EDIT_BOOK_RATING = `${environment.api}/ratings`;
export const REMOVE_BOOK_RATING = `${environment.api}/ratings`;
