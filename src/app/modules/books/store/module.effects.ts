import { BookEffects } from "./book.effects";
import { BooksPaginationEffects } from "./pagination/books-pagination.effects";
import { RemoveBookEffects } from "./remove-book/remove-book.effects";
import { SearchBookEffects } from "./search/search-book.effects";
import { BookWebPageEffects } from "./webpage/book-webpage.effects";

export const moduleEffects: any[] = [BooksPaginationEffects, BookWebPageEffects,
  SearchBookEffects, BookEffects,RemoveBookEffects]
