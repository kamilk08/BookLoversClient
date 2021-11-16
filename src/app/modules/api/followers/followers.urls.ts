import { Query } from 'src/app/modules/shared/common/query';
import { environment } from 'src/environments/environment';

export const GET_FOLLOWERS_IDS = (readerId: number, query: Query) => `${environment.api}/readers/${readerId}/followers/ids/${query.page}/${query.count}/${query.value}`;
export const GET_FOLLOWINGS_IDS = (readerId: number, query: Query) => `${environment.api}/readers/${readerId}/followings/ids/${query.page}/${query.count}/${query.value}`;
export const IS_FOLLOWING = (followedId:number)=>`${environment.api}/readers/${followedId}/following`

export const ADD_FOLLOWER = `${environment.api}/readers/follow`;
export const REMOVE_FOLLOWER = `${environment.api}/readers/follow`;
