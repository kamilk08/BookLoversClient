import { AbstractControl } from '@angular/forms';
import { timer, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PublisherCycleApi } from '../../api/cycles/publisher-cycle.api';
import { DEFAULT_DELAY } from '../../shared/common/constants';

export function isPublisherCycleUnique(api: PublisherCycleApi) {

  return (control: AbstractControl) => {
    let cycleName: string = control.value;

    if (control.valid && control.dirty)
      return of(null);


    return timer(DEFAULT_DELAY).pipe(
      switchMap(() => {
        return api.getPublisherCycleByName(cycleName)
          .pipe(map(response => response !== undefined ? { cycleNotUnique: true } : null));
      }),
      catchError(error => of({ cycleNotUnique: true }))
    );
  }
}
