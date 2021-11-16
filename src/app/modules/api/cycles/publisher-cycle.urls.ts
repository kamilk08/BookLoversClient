import { environment } from 'src/environments/environment';

export const GET_PUBLISHER_CYCLE_BY_ID = (id: number) => `${environment.api}/cycles/${id}`;
export const GET_PUBLISHER_CYCLE_BY_NAME = (name: string) => `${environment.api}/cycles/name/${name}`;
export const GET_MULTIPLE_PUBLISHER_CYCLES = `${environment.api}/cycles/list`;
export const FIND_PUBLISHER_CYCLE = (query: string, page: number, count: number) => `${environment.api}/cycles/filters/${query}/${page}/${count}`;
export const ADD_PUBLISHER_CYCLE = `${environment.api}/cycles`;
export const ADD_CYCLE_BOOK = `${environment.api}/cycles/book`;
export const REMOVE_CYCLE_BOOK = `${environment.api}/cycles/book`;

