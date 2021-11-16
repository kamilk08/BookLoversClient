import * as fromActions from '../follow-author/follow-author.actions';
import { FollowAuthor } from '../follow-author/follow-author.reducer';
import * as fromReducer from '../follow-author/follow-author.reducer';
import { AuthorBasics } from 'src/app/modules/api/authors/authors/models/author-basics.model';
import { AuthorDescription } from 'src/app/modules/api/authors/authors/models/author-description.model';
import { AuthorDetails } from 'src/app/modules/api/authors/authors/models/author-details.model';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { FullName, Sex } from 'src/app/modules/shared';
import { ApiError } from 'src/app/modules/api/api-error.model';

describe('follow author reducer', () => {
  const initialState: FollowAuthor = {
    author: undefined,
    userId: undefined,
    succeded: undefined,
    processing: false,
    error: undefined
  };

  describe('FOLLOW_AUTHOR', () => {
    it('should return new state with defined author, userId property and processing switched to true', () => {

      const authorId = 1;
      const userId = 1;

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

      author.identification.id = authorId;


      const action = fromActions.FOLLOW_AUTHOR({ payload: { author, userId } });

      const newState = fromReducer.followAuthorReducer(initialState, action);

      expect(newState).toBeDefined();
      expect(newState.author.followers.length).toBe(1);
      expect(newState.userId).toBe(userId);
      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FOLLOW_AUTHOR_SUCCESS', () => {
    it('should return new state with processing set to false and succeded to true', () => {

      const action = fromActions.FOLLOW_AUTHOR_SUCCESS();

      const newState = fromReducer.followAuthorReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.succeded).toBeTruthy();
    });
  });

  describe('FOLLOW_AUTHOR_FALIURE', () => {
    it('should return new state with processing set to false and succeded to false', () => {

      const action = fromActions.FOLLOW_AUTHOR_FALIURE({ payload: { author: undefined, userId: undefined, model: new ApiError() } });

      const newState = fromReducer.followAuthorReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.succeded).toBeFalsy();
    });
  });
});
