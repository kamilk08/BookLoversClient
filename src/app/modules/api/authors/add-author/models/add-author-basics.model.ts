import { AuthorBasics } from '../../authors/models/author-basics.model';

export class AddAuthorBasics {
  public readonly firstName: string;
  public readonly secondName: string;
  public readonly sex: number

  constructor(basics: AuthorBasics) {
    this.firstName = basics.fullName.firstName;
    this.secondName = basics.fullName.secondName;
    this.sex = basics.sex.id;
  }
}
