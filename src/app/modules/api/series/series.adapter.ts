import { Adapter } from 'src/app/modules/shared/adapter';
import { Series } from './models/series.model';

export class SeriesAdapter implements Adapter<Series>{
  adapt(item: any): Series {

    if (!item)
      return undefined;

    const series: Series = {
      identification: { id: item.id, guid: item.guid },
      seriesName: item.seriesName,
      books: item.books,
      setSeriesId: Series.prototype.setSeriesId
    };
    return series;
  }
}
