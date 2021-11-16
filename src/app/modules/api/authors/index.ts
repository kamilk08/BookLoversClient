import { AddAuthorApi } from "./add-author/add-author.api";
import { AuthorFollowersApi } from "./author-followers/author-followers.api";
import { AuthorAdapter } from "./authors/author.adapter";
import { AuthorApi } from "./authors/author.api";
import { EditAuthorApi } from "./edit-author/edit-author.api";
import { RemoveAuthorApi } from "./remove-author/remove-author.api";

export const api: any[] = [AddAuthorApi, AuthorFollowersApi, AuthorApi,
  EditAuthorApi, RemoveAuthorApi];

export const adapters: any[] = [AuthorAdapter]
