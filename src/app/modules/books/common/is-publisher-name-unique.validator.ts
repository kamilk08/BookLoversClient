import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { timer, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PublisherApi } from '../../api/publishers/publisher.api';
import { DEFAULT_DELAY } from '../../shared/common/constants';

export function isPublisherNameUnique(publisherApi: PublisherApi, minLength: number): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const val: string = control.value
    if (val.length < minLength)
      return of(null);

    return timer(DEFAULT_DELAY).pipe(switchMap(() => {
      return publisherApi.getPublisherByName(val)
        .pipe(
          map((response) => {
            return response !== undefined ? { publisherNameNotUnique: true } : null
          }),
          catchError((error) => of({ publisherNameNotUnique: true }))
        )
    }))
  }

}
