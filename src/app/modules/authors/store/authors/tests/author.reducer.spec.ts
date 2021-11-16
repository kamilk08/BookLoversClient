import { AuthorBasics } from 'src/app/modules/api/authors/authors/models/author-basics.model';
import { AuthorDescription } from 'src/app/modules/api/authors/authors/models/author-description.model';
import { AuthorDetails } from 'src/app/modules/api/authors/authors/models/author-details.model';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { FullName, Sex } from 'src/app/modules/shared';
import * as fromActions from '../author.actions';
import * as fromReducer from '../author.reducer';
import { AuthorsState } from '../author.reducer';

describe('author reducer tests', () => {

  const initialState: AuthorsState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  }
  describe('SELECT_AUTHOR', () => {
    it('should return new state with processing property defined to true', () => {

      const action = fromActions.SELECT_AUTHOR({ payload: { id: 1 } });

      const newState = fromReducer.authorReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_AUTHOR', () => {
    it('should return new state with author added to current state', () => {

      const authorId = 1;
      const userId = 1;

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

      author.identification.id = authorId;

      const action = fromActions.FETCH_AUTHOR({ payload: { author } });

      const newState = fromReducer.authorReducer(initialState, action);

      expect(newState.entities[authorId]).toBeDefined();
    })
  });

  describe('FETCH_MULTIPLE_AUTHORS', () => {
    it('should return new state with authors added to current state', () => {
      const firstAuthorId = 1;
      const secondAuthorId = 2;
      const userId = 1;

      let firstAuthor = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

      firstAuthor.identification.id = firstAuthorId;

      let secondAuthor = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

      secondAuthor.identification.id = secondAuthorId;

      let authors = [firstAuthor, secondAuthor];

      const action = fromActions.FETCH_MULTIPLE_AUTHORS({ payload: { authors } });

      const newState = fromReducer.authorReducer(initialState, action);

      expect(newState.entities[firstAuthorId]).toBeDefined();
      expect(newState.entities[secondAuthorId]).toBeDefined();
    })
  });

  describe('UPSERT_AUTHOR', () => {
    it('should return new state with updated author', () => {

      const authorId = 1;
      const userId = 1;

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

      author.identification.id = authorId;

      const action = fromActions.FETCH_AUTHOR({ payload: { author } });

      let newState = fromReducer.authorReducer(initialState, action);

      const upsertAuthorAction = fromActions.ADD_OR_UPDATE_AUTHOR({ payload: { author, authorId } });

      newState = fromReducer.authorReducer(newState, upsertAuthorAction);

      expect(newState.entities[authorId]).toBeDefined();

    })
  });

  describe('DELETE_AUTHOR', () => {
    it('should return new state with removed author', () => {
      const authorId = 1;
      const userId = 1;

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

      author.identification.id = authorId;

      const action = fromActions.FETCH_AUTHOR({ payload: { author } });

      let newState = fromReducer.authorReducer(initialState, action);

      const removeAuthorAction = fromActions.DELETE_AUTHOR({ payload: { authorId } });

      newState = fromReducer.authorReducer(newState, removeAuthorAction);

      expect(newState.entities[authorId]).toBeUndefined();
    })
  });

})
