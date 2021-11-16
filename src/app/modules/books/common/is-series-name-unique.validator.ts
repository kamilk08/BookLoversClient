import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { timer, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SeriesApi } from '../../api/series/series.api';
import { DEFAULT_DELAY } from '../../shared/common/constants';

export function isSeriesNameUnique(seriesApi: SeriesApi, minLength: number) {

  return (control: AbstractControl) => {
    const seriesName: string = control.value;
    if (seriesName.length < minLength)
      return of(null);

    return timer(DEFAULT_DELAY).pipe(
      switchMap(() => {
        return seriesApi.getSeriesByName(seriesName)
          .pipe(map(response => response !== undefined ? { seriesNotUnique: true } : null))
      }),
      catchError(error => of({ seriesNotUnique: true }))
    )
  }
}

