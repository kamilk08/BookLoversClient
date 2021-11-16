import { UUID } from 'angular2-uuid';

export interface AddQuoteResponse {
  readonly quoteId: number
  readonly quoteGuid: UUID,
  readonly quotedGuid: UUID
  readonly quote: string
  readonly addedAt: string
}
