import { AuthorBasics } from 'src/app/modules/api/authors/authors/models/author-basics.model';
import { AuthorDescription } from 'src/app/modules/api/authors/authors/models/author-description.model';
import { AuthorDetails } from 'src/app/modules/api/authors/authors/models/author-details.model';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { FullName, Sex } from 'src/app/modules/shared';
import * as  fromActions from '../edit-author-state/edit-author.actions';
import { EditAuthorState } from '../edit-author-state/edit-author.reducer';
import * as fromReducer from '../edit-author-state/edit-author.reducer';
import { ApiError } from 'src/app/modules/api/api-error.model';

describe('Edit author reducer', () => {
  const initialState: EditAuthorState = {
    editedAuthor: undefined,
    oldAuthor: undefined,
    processing: false,
    error: undefined
  };

  describe('EDIT_AUTHOR', () => {
    it('should return new state with editedAuthor and old author defined', () => {

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', 1), []);

      author.identification.id = 1;

      const action = fromActions.EDIT_AUTHOR({ payload: { author, oldAuthor: author, image: null } })

      const newState = fromReducer.editAuthorReducer(initialState, action);

      expect(newState).toBeDefined();
      expect(newState.editedAuthor).toBeDefined();
    });
  });

  describe('EDIT_AUTHOR_SUCCESS', () => {
    it('should return new state with processing property set to false', () => {

      const action = fromActions.EDIT_AUTHOR_SUCCESS();

      const newState = fromReducer.editAuthorReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
    });
  });

  describe('EDIT_AUTHOR_FALIURE', () => {
    it('should return new state with defined error property', () => {

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', 1), []);

      author.identification.id = 1;

      const action = fromActions.EDIT_AUTHOR_FALIURE({ payload: { author, model: new ApiError()} });

      const newState = fromReducer.editAuthorReducer(initialState, action);

      expect(newState.error).toBeDefined();
    })
  })

});
