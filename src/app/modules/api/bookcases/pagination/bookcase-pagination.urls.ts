import { environment } from 'src/environments/environment';

export const GET_BOOKCASE_COLLECTION = (bookcaseId: number, page: number, count: number, descending: boolean, sortType: number, title: string) => `${environment.api}/bookcases/${bookcaseId}/books/${page}/${count}/${descending}/${sortType}/${title}`;
