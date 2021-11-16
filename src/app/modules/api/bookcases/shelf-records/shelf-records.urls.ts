import { environment } from 'src/environments/environment';

export const GET_RECORD_SHELF = (shelfId: number, bookId: number) => `${environment.api}/bookcases/shelves/${shelfId}/books/${bookId}`;
export const GET_MULTIPLE_SHELF_RECORDS = (bookcaseId: number) => `${environment.api}/bookcases/${bookcaseId}/shelves/books/list`;
