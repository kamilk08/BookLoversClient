import { UUID } from 'angular2-uuid'
import { Author } from '../../authors/models/author.model';
import { EditAuthorBasics } from './edit-author-basics.model';
import { EditAuthorDescription } from './edit-author-description.model';
import { EditAuthorDetails } from './edit-author-details.model';

export class EditAuthorDto {
  public readonly authorId: number
  public readonly authorGuid: UUID;
  public readonly basics: EditAuthorBasics;
  public readonly details: EditAuthorDetails;
  public readonly description: EditAuthorDescription

  public readonly authorGenres: number[];
  public readonly readerGuid: UUID;

  constructor(author: Author, addedBy: UUID) {
    this.authorGuid = author.identification.guid;
    this.basics = new EditAuthorBasics(author.basics);
    this.details = new EditAuthorDetails(author.details);
    this.description = new EditAuthorDescription(author.description);

    this.authorGenres = author.getAuthorGenresIds();
    this.readerGuid = addedBy;
  }

}
