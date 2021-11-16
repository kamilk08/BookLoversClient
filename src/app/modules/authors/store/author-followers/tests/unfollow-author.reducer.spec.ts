import { ApiError } from 'src/app/modules/api/api-error.model';
import { AuthorBasics } from 'src/app/modules/api/authors/authors/models/author-basics.model';
import { AuthorDescription } from 'src/app/modules/api/authors/authors/models/author-description.model';
import { AuthorDetails } from 'src/app/modules/api/authors/authors/models/author-details.model';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { Follower, FullName, Sex } from 'src/app/modules/shared';
import * as fromActions from '../unfollow-author/unfollow-author.actions';
import * as fromReducer from '../unfollow-author/unfollow-author.reducer';
import { UnFollowAuthor } from '../unfollow-author/unfollow-author.reducer';

describe('unfollow author reducer', () => {

  const initialState: UnFollowAuthor = {
    author: undefined,
    userId: undefined,
    succeded: undefined,
    processing: false,
    error: undefined
  };

  describe('UNFOLLOW_AUTHOR', () => {
    it('should return new state with updated follower,userId and processing set to true', () => {

      const authorId = 1;
      const userId = 1;

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

      author.identification.id = authorId;

      author.followers.push(new Follower(author.identification.id, userId));

      const action = fromActions.UNFOLLOW_AUTHOR({ payload: { author, userId } });

      const newState = fromReducer.unFollowAuthorReducer(initialState, action);

      expect(newState.author.followers.length).toBe(0);
      expect(newState.userId).toBe(userId);
      expect(newState.processing).toBeTruthy();
    })

  });

  describe('UNFOLLOW_AUTHOR_SUCCESS', () => {
    it('should return new state with processing set to false succeded to true', () => {

      const action = fromActions.UNFOLLOW_AUTHOR_SUCCESS();

      const newState = fromReducer.unFollowAuthorReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.succeded).toBeTruthy();
    })

  });

  describe('UNFOLLOW_AUTHOR_FALIURE', () => {
    it('should return new state with processing set to false and succeded to false', () => {

      const action = fromActions.UNFOLLOW_AUTHOR_FALIURE({ payload: { author: undefined, userId: undefined, model: new ApiError() } });

      const newState = fromReducer.unFollowAuthorReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.succeded).toBeFalsy();
    })
  })

})
