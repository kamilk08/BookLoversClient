import { Shelf } from 'src/app/modules/bookcases/models';
import { DialogResult } from 'src/app/modules/shared/common/dialog-result.event';

export interface RemoveCustomShelfResult extends DialogResult {
  shelf: Shelf
}
