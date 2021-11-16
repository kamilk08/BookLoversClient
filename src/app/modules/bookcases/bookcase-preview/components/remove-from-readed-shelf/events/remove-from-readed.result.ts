import { Bookcase, Shelf } from 'src/app/modules/bookcases/models';
import { Book } from 'src/app/modules/api/books/models';

export interface RemoveFromReadedResult {
  bookcase: Bookcase,
  shelf: Shelf,
  book: Book,
  accepted: boolean
}
