import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';

export const GET_PROMOTIONS_PAGE = `${environment.api}/librarians/promotions`;

export const CREATE_LIBRARIAN = `${environment.api}/librarians`;
export const DEGRADE_LIBRARIAN = (guid: UUID) => `${environment.api}/librarians/${guid}`;

