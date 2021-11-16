import { AddBookApi } from "./add/add-book.api"
import { BookAdapter } from "./book.adapter"
import { BookApi } from "./book.api"
import { EditBookApi } from "./edit/edit-book.api"
import { RemoveBookApi } from "./remove/remove-book.api"

export const api: any[] = [AddBookApi, EditBookApi, RemoveBookApi, BookApi]
export const adapters: any[] = [BookAdapter]
