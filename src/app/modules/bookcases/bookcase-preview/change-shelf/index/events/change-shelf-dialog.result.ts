import { Shelf } from 'src/app/modules/bookcases/models';
import { Book } from 'src/app/modules/api/books/models';
import { DialogResult } from 'src/app/modules/shared/common/dialog-result.event';

export interface ChangeShelfDialogResult extends DialogResult{
  oldShelf:Shelf,
  newShelf:Shelf,
  book:Book
}
