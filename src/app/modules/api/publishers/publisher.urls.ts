import { environment } from "src/environments/environment";

export const GET_PUBLISHER_BY_ID = (id: number) => `http://localhost:64892/api/publishers/${id}`;
export const GET_PUBLISHER_BY_NAME = (name: string) => `http://localhost:64892/api/publishers/name/${name}`
export const GET_PUBLISHER_BY_BOOK_ID = (bookId: number) => `http://localhost:64892/api/publishers/book/${bookId}`;
export const FIND_PUBLISHER = (query: string, page: number, count: number) => `http://localhost:64892/api/publishers/filters/${query}/${page}/${count}`;
export const GET_PUBLISHER_COLLECTION = (publisherId: number, title: string, page: number, count: number, descending: boolean, sortType: number) => `${environment.api}/publishers/${publisherId}/books/${page}/${count}/${descending}/${sortType}/${title}`;

export const CREATE_PUBLISHER = `http://localhost:64892/api/publishers`;
