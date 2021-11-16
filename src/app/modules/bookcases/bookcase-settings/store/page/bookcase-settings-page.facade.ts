import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Shelf } from "../../../models";
import { BookcaseSettings } from "../../models/bookcase-settings.model";

import * as fromIndex from '../index';
import * as fromSelectors from '../module.selectors';
import { OPEN_EDIT_SHELF_MODAL, OPEN_NEW_SHELF_MODAL, OPEN_REMOVE_SHELF_MODAL, SUBMIT_SETTINGS_FORM, UPDATE_SETTINGS_FORM } from "./bookcase-settings-page.actions";

@Injectable()
export class BookcaseSetttingsPageFacade {

  public readonly settingsForm$ = this.store.select(fromSelectors.settingForm);

  constructor(private readonly store: Store<fromIndex.BookcaseSettingsState>) {

  }

  submitSettingsForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_SETTINGS_FORM({ payload: { form } }));
  }

  updateSettingsForm(settings: BookcaseSettings) {
    this.store.dispatch(UPDATE_SETTINGS_FORM({ payload: { settings } }));
  }

  openNewShelfModal() {
    this.store.dispatch(OPEN_NEW_SHELF_MODAL());
  }

  openEditShelfModal(shelf: Shelf) {
    this.store.dispatch(OPEN_EDIT_SHELF_MODAL({ payload: { shelf } }))
  }

  openRemoveShelfModal(shelf: Shelf) {
    this.store.dispatch(OPEN_REMOVE_SHELF_MODAL({ payload: { shelf } }));
  }

}
