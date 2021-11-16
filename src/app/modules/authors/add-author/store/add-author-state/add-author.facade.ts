import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { SUBMIT_ADD_AUTHOR_FORM, RESET_ADD_AUTHOR_FORM, SET_AUTHOR_IMAGE_ON_FORM } from '../add-author-modal-state/add-author-modal.actions';
import * as fromModule from '../index';
import * as fromSelectors from '../module.selectors';

@Injectable()
export class AddAuthorFacade {

  public readonly addAuthorForm$ = this.store.select(fromSelectors.addAuthorForm);

  public readonly authorToAdd$ = (userId: number) => this.store.select(fromSelectors.authorToAdd(userId));
  public readonly authorImage$ = this.store.select(fromSelectors.authorImage);

  public readonly success$ = this.store.select(fromSelectors.success);

  constructor(private store: Store<fromModule.AddAuthorModuleState>) { }

  submitForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_ADD_AUTHOR_FORM({ payload: { form } }));
  }

  resestAddAuthorForm() {
    this.store.dispatch(RESET_ADD_AUTHOR_FORM());
  }

  setAuthorImage(selectedImage: SelectedImage) {
    this.store.dispatch(SET_AUTHOR_IMAGE_ON_FORM({ payload: { selectedImage } }));
  }

}
