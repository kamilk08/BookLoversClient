import { UUID } from 'angular2-uuid';
import { environment } from 'src/environments/environment';

export const REMOVE_AUTHOR = (guid: UUID) => `${environment.api}/authors/{${guid}}`
