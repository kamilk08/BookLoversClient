import { environment } from 'src/environments/environment';

export const GET_SERIES_BY_ID = (id: number) => `${environment.api}/series/${id}`;
export const GET_MULTIPLE_SERIES = `${environment.api}/series/list`;
export const GET_SERIES_BY_NAME = (name: string) => `${environment.api}/series/name/${name}`;
export const GET_SERIES_BY_BOOK = (bookId: number) => `${environment.api}/series/book/${bookId}`;
export const GET_SERIES_BOOKS = (seriesId: number, page: number, count: number, descending: boolean, title: string, sortType: number) => `${environment.api}/series/${seriesId}/books/${page}/${count}/${descending}/${sortType}/${title}`;
export const GET_SERIES_BY_AUTHOR = (authorId: number, page: number, count: number) => `${environment.api}/series/author/${authorId}/${page}/${count}`
export const FIND_SERIES = (query: string, page: number, count: number) => `${environment.api}/series/filters/${query}/${page}/${count}`;


export const ADD_SERIES = `${environment.api}/series`;
