import { environment } from 'src/environments/environment';

export const GET_FAVOURITE_AUTHORS = (readerId: number) => `${environment.api}/readers/${readerId}/profile/authors`;
export const GET_FAVOURITE_BOOKS = (readerId:number)=> `${environment.api}/readers/${readerId}/profile/books`;

export const ADD_FAVOURITE_AUTHOR= `${environment.api}/readers/profile/favourites/author`;
export const ADD_FAVOURITE_BOOK = `${environment.api}/readers/profile/favourites/book`;
export const REMOVE_FAVOURITE = `${environment.api}/readers/profile/favourites`;
