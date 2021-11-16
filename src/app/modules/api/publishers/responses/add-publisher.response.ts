import { UUID } from 'angular2-uuid';

export interface AddPublisherResponse {
  publisherId: number
  publisherGuid: UUID,
  name: string
}
