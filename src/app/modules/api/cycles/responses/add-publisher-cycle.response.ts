import { UUID } from 'angular2-uuid';

export interface AddPublisherCycleResponse {
  readonly publisherCycleId: number
  readonly cycleGuid: UUID
  readonly publisherGuid: UUID
  readonly cycle: string
}
