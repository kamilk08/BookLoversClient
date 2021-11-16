import { Book } from "src/app/modules/api/books/models";
import { DialogResult } from "src/app/modules/shared/common/dialog-result.event";

export interface RemoveBookDialogResult extends DialogResult {
  book: Book
}
