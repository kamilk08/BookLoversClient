import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { SignUpApi } from "src/app/modules/api/auth/sign-up/sign-up.api";
import { Profile } from "../../../../api/profiles/models/profile.model";
import * as fromModule from '../index';
import * as fromSelectors from '../module.selectors';
import { RESET_CHANGE_EMAIL_FORM, SET_CHANGE_EMAIL_FORM_ASYNC_VALIDATOR, SUBMIT_CHANGE_EMAIL_FORM } from "./change-email/change-email-form.actions";
import { RESET_CHANGE_PASSWORD_FORM, SUBMIT_CHANGE_PASSWORD_FORM } from "./change-password/change-password-form.actions";
import { SUBMIT_CHANGE_PROFILE_FORM, UPDATE_CHANGE_PROFILE_FORM } from "./change-profile/change-profile-form.actions";
import { ADD_PROFILE_FAVOURITE_AUTHOR, ADD_PROFILE_FAVOURITE_BOOK, REMOVE_PROFILE_FAVOURITE_AUTHOR, REMOVE_PROFILE_FAVOURITE_BOOK, SEARCH_FAVOURITE_AUTHORS, SEARCH_FAVOURITE_BOOKS, SET_READER_ID_ON_PROFILE_PAGE } from "./profile-web-page.actions";

@Injectable()
export class ProfileWebPageFacade {

  public readonly readerId$ = this.store.select(fromSelectors.readerId);

  public readonly changeEmailForm$ = this.store.select(fromSelectors.changeEmailForm);
  public readonly changePasswordForm$ = this.store.select(fromSelectors.changePasswordForm);
  public readonly changeProfileForm$ = this.store.select(fromSelectors.changeProfileForm);

  constructor(private store: Store<fromModule.ProfilesModuleState>, private api: SignUpApi) {
  }

  setReaderIdOnProfilePage(readerId: number) {
    this.store.dispatch(SET_READER_ID_ON_PROFILE_PAGE({ payload: { readerId } }))
  }

  submitChangeProfileForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_CHANGE_PROFILE_FORM({ payload: { form } }));
  }

  submitChangePasswordForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_CHANGE_PASSWORD_FORM({ payload: { form } }))
  }

  submitChangeEmailForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_CHANGE_EMAIL_FORM({ payload: { form } }))
  }

  updateChangeEmailForm(profile: Profile) {
    this.store.dispatch(UPDATE_CHANGE_PROFILE_FORM({ payload: { profile } }))
  }

  resetChangeEmailForm() {
    this.store.dispatch(RESET_CHANGE_EMAIL_FORM())
  }

  resetChangePasswordForm() {
    this.store.dispatch(RESET_CHANGE_PASSWORD_FORM())
  }

  setEmailAsyncValidator() {
    this.store.dispatch(SET_CHANGE_EMAIL_FORM_ASYNC_VALIDATOR({ payload: { api: this.api } }))
  }

  // addOrRemoveFollower(flag: boolean, readerId: number) {
  //   this.store.dispatch(ADD_OR_REMOVE_FOLLOW({ payload: { flag, readerId } }));
  // }

  addProfileAuthor(guid: UUID) {
    this.store.dispatch(ADD_PROFILE_FAVOURITE_AUTHOR({ payload: { guid } }));
  }

  addProfileBook(guid: UUID) {
    this.store.dispatch(ADD_PROFILE_FAVOURITE_BOOK({ payload: { guid } }));
  }

  removeProfileAuthor(guid: UUID) {
    this.store.dispatch(REMOVE_PROFILE_FAVOURITE_AUTHOR({ payload: { guid } }))
  }

  removeProfileBook(guid: UUID) {
    this.store.dispatch(REMOVE_PROFILE_FAVOURITE_BOOK({ payload: { guid } }))
  }

  findFavouriteAuthor(value: string) {
    this.store.dispatch(SEARCH_FAVOURITE_AUTHORS({ payload: { value } }));
  }

  findFavouriteBook(value: string) {
    this.store.dispatch(SEARCH_FAVOURITE_BOOKS({ payload: { value } }));
  }

}
