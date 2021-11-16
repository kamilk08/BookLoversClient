import { AuthorDescription } from '../../authors/models/author-description.model';

export class AddAuthorDescription {

  public readonly aboutAuthor: string;
  public readonly descriptionSource: string;
  public readonly webSite: string

  constructor(description: AuthorDescription) {
    this.aboutAuthor = description.about;
    this.descriptionSource = description.source;
    this.webSite = description.website;
  }
}
