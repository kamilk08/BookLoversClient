import { environment } from 'src/environments/environment';

export const GET_READER_STATISTICS = (readerId: number) => `${environment.api}/readers/${readerId}/statistics`;
export const GET_READER_RATINGS_STATISTICS = (readerId: number) => `${environment.api}/ratings/reader/${readerId}`;
