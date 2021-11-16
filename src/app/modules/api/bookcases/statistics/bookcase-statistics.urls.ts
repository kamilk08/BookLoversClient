import { environment } from 'src/environments/environment';

export const GET_SHELVES_WITH_BOOK = (bookId: number, page: number, count: number) => `${environment.api}/bookcases/shelves/books/${bookId}/${page}/${count}`;
export const GET_BOOKCASES_WITH_BOOK = (bookId: number) => `${environment.api}/bookcases/books/${bookId}`;
export const GET_BOOKCASE_STATISTICS = (readerId: number) => `${environment.api}/bookcases/readers/${readerId}/statistics`;
