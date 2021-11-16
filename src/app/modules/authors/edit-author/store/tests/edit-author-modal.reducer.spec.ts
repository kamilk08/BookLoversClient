import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorBasics } from 'src/app/modules/api/authors/authors/models/author-basics.model';
import { AuthorDescription } from 'src/app/modules/api/authors/authors/models/author-description.model';
import { AuthorDetails } from 'src/app/modules/api/authors/authors/models/author-details.model';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { FullName, Sex } from 'src/app/modules/shared';
import * as fromActions from '../edit-author-modal-state/edit-author-modal.actions';
import { EditAuthorModalState } from '../edit-author-modal-state/edit-author-modal.reducer';
import * as fromReducer from '../edit-author-modal-state/edit-author-modal.reducer';


describe('Edit author modal reducer', () => {

  const initialState: EditAuthorModalState = {
    author: undefined,
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

  describe('SET_AUTHOR_ON_EDIT_AUTHOR_PAGE', () => {
    it('should return new state with defined author property and updated form property', () => {

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', 1), []);

      const action = fromActions.SET_AUTHOR_ON_EDIT_AUTHOR_PAGE({ payload: { author } });

      const newState = fromReducer.editAuthorModalReducer(initialState, action);

      expect(newState).toBeDefined();
      expect(newState.author).toBeDefined();
    })
  });


  describe('SET_AUTHOR_IMAGE_ON_EDIT_AUTHOR_FORM', () => {
    it('should return new state with defined image property', () => {

      const action = fromActions.SET_AUTHOR_IMAGE_ON_EDIT_AUTHOR_FORM({
        payload: {
          selectedImage: {
            encodedImage: '',
            fileName: ''
          }
        }
      });

      const newState = fromReducer.editAuthorModalReducer(initialState, action);

      expect(newState.form.get('image').value).toBeDefined();
    })
  })

});
