import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';

export const GET_LIBRARIAN_BY_ID = (librarianId:number)=> `${environment.api}/librarians/${librarianId}`;
export const GET_LIBRARIAN_BY_USER_GUID = (guid:UUID)=> `${environment.api}/librarians/reader/${guid}`;
export const GET_LIBRARIANS_PAGE = `${environment.api}/librarians/list`;
