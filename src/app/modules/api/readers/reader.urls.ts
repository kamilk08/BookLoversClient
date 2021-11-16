import { UUID } from 'angular2-uuid';
import { Query } from 'src/app/modules/shared/common/query';
import { environment } from 'src/environments/environment';

export const GET_READER_BY_ID = (readerId: number) => `${environment.api}/readers/${readerId}`;
export const GET_READER_BY_GUID = (guid:UUID)=>`${environment.api}/readers/${guid}`

export const SEARCH_READER = (query:Query)=>`${environment.api}/readers/${query.page}/${query.count}/${query.value}`
