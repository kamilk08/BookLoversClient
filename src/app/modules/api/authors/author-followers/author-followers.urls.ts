import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';

export const FOLLOW_AUTHOR = (guid: UUID) => `${environment.api}/authors/${guid}/follow`;
export const UNFOLLOW_AUTHOR = (guid: UUID) => `${environment.api}/authors/${guid}/follow`;
