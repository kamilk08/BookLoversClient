import { AddSeriesEffects } from "./add-series/add-series.effects";
import { SeriesBooksEffects } from "./series-books/series-books.effects";
import { SeriesWebPageEffects } from "./page/series-web-page.effects";
import { SearchSeriesEffects } from "./search-series/search-series.effects";
import { SeriesPaginationEffects } from "./series-pagination/series-pagination.effects";
import { SeriesEffects } from "./series/series.effects";

export const moduleEffects: any[] = [
  SearchSeriesEffects,
  SeriesEffects,
  AddSeriesEffects,
  SeriesPaginationEffects,
  SeriesWebPageEffects,
  SeriesBooksEffects]
