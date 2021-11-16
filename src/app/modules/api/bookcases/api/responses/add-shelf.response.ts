import { UUID } from 'angular2-uuid';

export interface AddShelfResponse {
  bookcaseGuid: UUID,
  shelfGuid: UUID,
  shelfId: number,
  shelfName: string
}
