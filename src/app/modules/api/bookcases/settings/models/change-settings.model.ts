import { UUID } from 'angular2-uuid';
import { BookcaseOption } from '../../../../bookcases/bookcase-settings/models/bookcase-option';
import { SelectedOption } from '../../../../bookcases/bookcase-settings/models/selected-option';
import { BookcaseSettings } from '../../../../bookcases/bookcase-settings/models/bookcase-settings.model';


export class ChangeSettings {

  public readonly bookcaseGuid: UUID;
  public readonly selectedOptions: Array<SelectedOption>;

  constructor(bookcaseGuid: UUID, settings: BookcaseSettings) {
    this.bookcaseGuid = bookcaseGuid;
    this.selectedOptions = [new SelectedOption(settings.privacy, BookcaseOption.PrivacyOption.id),
    new SelectedOption(settings.shelfCapacity, BookcaseOption.ShelfCapacityOption.id)]
  }

}
