import { AuthorBooksEffects } from "./author-books/author-books.effects";
import { FollowAuthorEffects } from "./author-followers/follow-author/follow-author.effects";
import { UnFollowAuthorEffects } from "./author-followers/unfollow-author/unfollow-author.effects";
import { AuthorWebPageEffects } from "./author-web-page/author-web-page.effects";
import { AuthorEffects } from "./authors/author.effects";
import { RemoveAuthorEffects } from "./remove-author/remove-author.effects";
import { SearchAuthorEffects } from "./search-authors/search-author.effects";

export const moduleEffects = [
  AuthorEffects,
  SearchAuthorEffects,
  UnFollowAuthorEffects,
  FollowAuthorEffects,
  AuthorWebPageEffects,
  RemoveAuthorEffects,
  AuthorBooksEffects]
