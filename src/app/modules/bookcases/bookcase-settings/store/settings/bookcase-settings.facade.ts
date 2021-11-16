import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookcaseSettingsState } from '..';
import { Bookcase } from '../../../models';

import { CHANGE_BOOKCASE_SETTINGS } from './bookcase-settings.actions';
import * as fromSelectors from './bookcase-settings.selectors';

@Injectable()
export class BookcaseSettingsFacade {

  public readonly bookcaseSettings$ = (bookcaseId: number) => this.store.select(fromSelectors.bookcaseSettingsById(bookcaseId));

  constructor(private store: Store<BookcaseSettingsState>) { }

  changeSettings(bookcase: Bookcase, settings: { privacy: number, shelfCapacity: number }) {
    this.store.dispatch(CHANGE_BOOKCASE_SETTINGS({ payload: { bookcase: bookcase, settings } }));
  }
}
