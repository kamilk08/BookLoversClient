import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';

export const GET_AUTHOR_BY_ID = (authorId: number) => `${environment.api}/authors/${authorId}`;
export const GET_AUTHOR_BY_GUID = (authorGuid: UUID) => `${environment.api}/authors/${authorGuid}`
export const GET_MULTIPLE_AUTHORS = `${environment.api}/authors/list/ids`;
export const GET_MULTIPLE_AUTHORS_BY_GUID = `${environment.api}/authors/list/guides`;

export const GET_AUTHOR_BOOKS = (authorId: number, page: number, count: number, descending: boolean, sortType: number, title: string) => `${environment.api}/authors/${authorId}/books/${page}/${count}/${descending}/${sortType}/${title}`;
export const GET_AUTHOR_BY_FULLNAME = (fullName: string) => `${environment.api}/authors/name/${fullName}`;
export const FIND_AUTHOR = (query: string, page: number, count: number) => `${environment.api}/authors/filters/${query}/${page}/${count}`;


