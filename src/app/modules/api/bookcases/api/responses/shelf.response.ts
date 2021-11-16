import { UUID } from 'angular2-uuid';

export interface ShelfResponse {
  id: number
  guid: UUID
  shelfCategory: number
  shelfName: string
  bookcaseId: number
  publications: [{ id: number, bookGuid: UUID }]
  publicationsCount: number
}
