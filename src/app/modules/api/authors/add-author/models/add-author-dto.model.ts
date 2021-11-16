import { UUID } from 'angular2-uuid'
import { Author } from '../../authors/models/author.model';
import { AddAuthorBasics } from './add-author-basics.model';
import { AddAuthorDetails } from './add-author-details.model';
import { AddAuthorDescription } from './add-author-description.model';

export class AddAuthorDto {
  public readonly authorId: number
  public readonly authorGuid: UUID;
  public readonly basics: AddAuthorBasics;
  public readonly details: AddAuthorDetails
  public readonly description: AddAuthorDescription

  public readonly authorGenres: number[];
  public readonly authorBooks: number[];
  public readonly readerGuid: UUID;

  constructor(author: Author, addedBy: UUID) {
    this.authorGuid = author.identification.guid;
    this.basics = new AddAuthorBasics(author.basics);
    this.details = new AddAuthorDetails(author.details);
    this.description = new AddAuthorDescription(author.description);

    this.authorGenres = author.getAuthorGenresIds();
    this.authorBooks = [];
    this.readerGuid = addedBy;
  }

}
