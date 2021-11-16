import { environment } from 'src/environments/environment';

///PROFILES
export const GET_PROFILE = (readerId: number) => `${environment.api}/readers/${readerId}/profile`;
export const CHANGE_PROFILE = `${environment.api}/readers/profile`;

