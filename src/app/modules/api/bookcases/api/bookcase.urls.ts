import { environment } from 'src/environments/environment';

export const GET_BOOKCASE = (id: number) => `${environment.api}/bookcases/${id}`;
export const GET_BOOKCASE_BY_USER_ID = (userId: number) => `${environment.api}/bookcases/reader/${userId}`;


export const ADD_TO_BOOKCASE = `${environment.api}/bookcase/book`;
export const ADD_SHELF = `${environment.api}/bookcase/shelf`;
export const CHANGE_BOOKS_SHELF = `${environment.api}/bookcase/shelves/book/`;
export const EDIT_SHELF_NAME = `${environment.api}/bookcase/shelf`;
export const REMOVE_FROM_SHELF = `${environment.api}/bookcase/shelves/book`;
export const REMOVE_FROM_BOOKCASE = `${environment.api}/bookcase/book`;
export const REMOVE_SHELF = `${environment.api}/bookcase/shelf`;
