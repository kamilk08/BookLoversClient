import { BookHashTag } from 'src/app/modules/api/books/models';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import * as fromActions from '../new-book-form.actions';
import * as fromReducer from '../new-book-form.reducer';
import { NewBookFormState } from '../new-book-form.reducer';


describe('NEW_BOOK_FORM_REDUCER', () => {

  const initialState: NewBookFormState = {
    form: undefined
  };


  describe('INITIALIZE_BOOK_FORM', () => {
    it('should return new state with defined form property', () => {

      const action = fromActions.INITIALIZE_BOOK_FORM();

      const newState = fromReducer.newBookFormReducer(initialState, action);

      expect(newState.form).toBeDefined();
    });
  });

  describe('BOOK_FORM_INVALID', () => {
    it('should return new state with updated form property', () => {

      const initialAction = fromActions.INITIALIZE_BOOK_FORM();

      let newState = fromReducer.newBookFormReducer(initialState, initialAction)

      const action = fromActions.BOOK_FORM_INVALID();

      newState = fromReducer.newBookFormReducer(newState, action);

      expect(newState.form).not.toEqual(initialState.form);
    });
  });

  describe('RESET_BOOK_FORM', () => {
    it('should return new state with updated form property', () => {

      const action = fromActions.RESET_BOOK_FORM();

      let initializeFormAction = fromActions.INITIALIZE_BOOK_FORM();

      let newState = fromReducer.newBookFormReducer(initialState, initializeFormAction);

      newState = fromReducer.newBookFormReducer(newState, action);

      expect(newState.form).not.toEqual(initialState.form);
    });

  });

  describe('ADD_BOOK_COVER', () => {
    it('should return new state with form that has cover and isCoverAdded property updated', () => {

      let initializeFormAction = fromActions.INITIALIZE_BOOK_FORM();

      let newState = fromReducer.newBookFormReducer(initialState, initializeFormAction);

      const image: SelectedImage = {
        encodedImage: 'encodedImage',
        fileName: 'asdasd'
      };

      const action = fromActions.ADD_BOOK_COVER({ payload: { image } });
      newState = fromReducer.newBookFormReducer(newState, action);

      expect(newState.form.get('cover').value).toBe(image);
    });
  });

  describe('ADD_BOOK_HASH_TAG_TO_BOOK_FORM', () => {
    it('should return new state with form that has updated hashtag control', () => {

      let initializeFormAction = fromActions.INITIALIZE_BOOK_FORM();

      let newState = fromReducer.newBookFormReducer(initialState, initializeFormAction);

      const hashTag: BookHashTag = {
        hashTagValue: 'foo'
      };

      const action = fromActions.ADD_BOOK_HASH_TAG_TO_BOOK_FORM({ payload: { hashTag } })
      newState = fromReducer.newBookFormReducer(newState, action);

      const bookHashTags = newState.form.get('hashTags').value as BookHashTag[];

      expect(bookHashTags.length).toBe(1);
    });
  });

  describe('REMOVE_BOOK_HASH_TAG_FROM_BOOK_FORM', () => {
    it('should return new state with form that has updated hashtag control', () => {

      let initializeFormAction = fromActions.INITIALIZE_BOOK_FORM();

      let newState = fromReducer.newBookFormReducer(initialState, initializeFormAction);

      const hashTag: BookHashTag = {
        hashTagValue: 'foo'
      };

      const action = fromActions.ADD_BOOK_HASH_TAG_TO_BOOK_FORM({ payload: { hashTag } })
      newState = fromReducer.newBookFormReducer(newState, action);

      const removeHashTagAction = fromActions.REMOVE_BOOK_HASH_TAG_FROM_BOOK_FORM({ payload: { hashTag } });

      newState = fromReducer.newBookFormReducer(newState, removeHashTagAction);

      const hashTags = newState.form.get('hashTags').value as BookHashTag[];

      expect(hashTags.length).toBe(0);
    });

  })
})
