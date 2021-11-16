import { AuthorDetails } from '../../authors/models/author-details.model';

export class EditAuthorDetails {

  public readonly birthDate: Date;
  public readonly deathDate: Date;
  public readonly birthPlace: string;

  constructor(authorDetails: AuthorDetails) {
    this.birthDate = authorDetails.birthDate;
    this.deathDate = authorDetails.deathDate;
    this.birthPlace = authorDetails.birthPlace;
  }
}
