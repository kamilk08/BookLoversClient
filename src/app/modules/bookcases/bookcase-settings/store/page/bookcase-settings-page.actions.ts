import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { NzModalRef } from "ng-zorro-antd";
import { Shelf } from "../../../models";
import { BookcaseSettings } from "../../models/bookcase-settings.model";

export const SUBMIT_SETTINGS_FORM = createAction('[BOOKCASE_SETTINGS] Submit settings form', props<{ payload: { form: FormGroup } }>());
export const UPDATE_SETTINGS_FORM = createAction('[BOOKCASE_STTINGS] Update settings form', props<{ payload: { settings: BookcaseSettings } }>());
export const OPEN_NEW_SHELF_MODAL = createAction('[BOOKCASE_SETTINGS] Open new shelf modal');
export const NEW_CUSTOM_SHELF_CONFIRMED = createAction('[BOOKCASE_SETTINGS] New custom shelf confirmed', props<{ payload: { shelfName: string } }>());
export const NO_ACTION = createAction('[BOOKCASE_SETTINGS] No action');

export const OPEN_EDIT_SHELF_MODAL = createAction('[BOOKCASE_SETTINGS] Open edit shelf modal', props<{ payload: { shelf: Shelf } }>());
export const OPEN_REMOVE_SHELF_MODAL = createAction('[BOOKCASE_SETTINGS] Open remove shelf modal', props<{ payload: { shelf: Shelf } }>());
