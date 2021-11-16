import { UUID } from 'angular2-uuid';
import { Series } from './series.model';


export class AddSeries {

  public readonly seriesGuid: UUID;
  public readonly seriesName: string

  constructor(series: Series) {
    this.seriesGuid = series.identification.guid;
    this.seriesName = series.seriesName;
  }
}
