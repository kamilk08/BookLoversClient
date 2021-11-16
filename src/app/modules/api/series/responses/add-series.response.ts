import { UUID } from 'angular2-uuid';

export interface AddSeriesResponse {
  readonly seriesId: number
  readonly seriesGuid: UUID
  readonly seriesName: string
}
