import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { Author } from '../../../api/authors/authors/models/author.model';
import * as fromModule from './index';
import * as fromSelectors from './edit-author-modal-state/edit-author-modal.selectors';
import { RESET_EDIT_AUTHOR_FORM, SET_AUTHOR_IMAGE_ON_EDIT_AUTHOR_FORM, SET_AUTHOR_ON_EDIT_AUTHOR_PAGE, SUBMIT_EDIT_AUTHOR_FORM } from './edit-author-modal-state/edit-author-modal.actions';

@Injectable()
export class EditAuthorFacade {

  public readonly editAuthorForm$ = this.store.select(fromSelectors.editAuthorForm);
  public readonly authorImage$ = this.store.select(fromSelectors.editAuthorImage);
  public readonly oldAuthor$ = this.store.select(fromSelectors.author);

  public readonly editedAuthor$ = (userId: number) => this.store.select(fromSelectors.editedAuthor(userId));

  constructor(private store: Store<fromModule.EditAuthorModuleState>) { }

  setAuthor(author: Author) {
    this.store.dispatch(SET_AUTHOR_ON_EDIT_AUTHOR_PAGE({ payload: { author } }));
  }

  submitEditAuthorForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_EDIT_AUTHOR_FORM({ payload: { form } }));
  }

  resetEditAuthorForm() {
    this.store.dispatch(RESET_EDIT_AUTHOR_FORM());
  }

  setAuthorImage(selectedImage: SelectedImage) {
    this.store.dispatch(SET_AUTHOR_IMAGE_ON_EDIT_AUTHOR_FORM({ payload: { selectedImage } }))
  }

}
