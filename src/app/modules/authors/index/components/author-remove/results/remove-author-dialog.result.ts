import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { DialogResult } from "src/app/modules/shared/common/dialog-result.event";

export interface RemoveAuthorDialogResult extends DialogResult {
  author: Author
}
