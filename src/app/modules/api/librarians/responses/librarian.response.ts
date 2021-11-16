import { UUID } from 'angular2-uuid';

export interface LibrarianResponse {
  readonly id: number
  readonly guid: UUID;
  readonly readerId: number
}
