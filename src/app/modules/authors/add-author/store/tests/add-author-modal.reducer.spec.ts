import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromActions from '../add-author-modal-state/add-author-modal.actions';
import * as fromReducer from '../add-author-modal-state/add-author-modal.reducer';
import { AddAuthorModalState } from '../add-author-modal-state/add-author-modal.reducer';

describe('add author modal reducer', () => {
  const initialState: AddAuthorModalState = {
    form: new FormGroup({
      firstName: new FormControl('', Validators.maxLength(128)),
      secondName: new FormControl('', [Validators.maxLength(128), Validators.required]),
      birthDate: new FormControl(null, []),
      deathDate: new FormControl(null, []),
      birthPlace: new FormControl('', [Validators.maxLength(255)]),
      sex: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(3)]),
      about: new FormControl('', [Validators.max(2083)]),
      website: new FormControl('', []),
      descriptionSource: new FormControl('', [Validators.maxLength(255)]),
      categories: new FormControl([]),
      image: new FormControl(null),
    })
  };

  describe('SUBMIT_ADD_AUTHOR_FORM', () => {
    it('should return new state', () => {
      const action = fromActions.SUBMIT_ADD_AUTHOR_FORM({
        payload: { form: initialState.form }
      });

      const newState = fromReducer.addAuthorModalReducer(initialState, action)

      expect(newState).toBeDefined();
    })

  });

  describe('ADD_AUTHOR_FORM_INVALID', () => {
    it('should return new state with updated form property', () => {
      const action = fromActions.ADD_AUTHOR_FORM_INVALID();

      const newState = fromReducer.addAuthorModalReducer(initialState, action)

      expect(newState).toBeDefined();
      expect(newState.form.valid).toBeFalsy();
    })
  });

  describe('RESET_ADD_AUTHOR_FORM', () => {
    it('should return new state with reseted form', () => {
      const action = fromActions.RESET_ADD_AUTHOR_FORM();

      const newState = fromReducer.addAuthorModalReducer(initialState, action)

      expect(newState).toBeDefined();
      expect(newState.form.valid).toBeFalsy();
    })
  });

  describe('SET_AUTHOR_IMAGE_ON_FORM', () => {
    it('should return new state with defined author image', () => {
      const action = fromActions.SET_AUTHOR_IMAGE_ON_FORM({
        payload: {
          selectedImage: {
            encodedImage: '',
            fileName: ''
          }
        }
      });

      const newState = fromReducer.addAuthorModalReducer(initialState, action);

      expect(newState.form.get('image').value).toBe(action.payload.selectedImage);
    })
  })
})
