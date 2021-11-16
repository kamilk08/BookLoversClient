import { DialogResult } from 'src/app/modules/shared/common/dialog-result.event';

export interface NewCustomShelfDialogResult extends DialogResult {
  shelfName: string;
}
