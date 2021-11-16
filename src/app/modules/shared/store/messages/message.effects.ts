import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { NzMessageService } from 'ng-zorro-antd';
import { SHOW_SUCCESS_MESSAGE, SHOW_FALIURE_MESSAGE } from './actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class MessageEffects {

  constructor(private actions$: Actions, private messageService: NzMessageService) { }

  showSuccessMessage$ = createEffect(() => this.actions$
    .pipe(
      ofType(SHOW_SUCCESS_MESSAGE),
      tap((action) => this.messageService.success(action.payload.message, action.payload.options))
    ), { dispatch: false })

  showFaliureMessage$ = createEffect(() => this.actions$
    .pipe(
      ofType(SHOW_FALIURE_MESSAGE),
      tap((action) => this.messageService.error(action.payload.message, action.payload.options))
    ), { dispatch: false });
}
