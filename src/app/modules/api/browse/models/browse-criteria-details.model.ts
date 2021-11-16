export class BrowseCriteriaDetails {
  public readonly author: string;
  public readonly isbn: string;
  public readonly from: Date;
  public readonly till: Date;

  constructor(author: string, isbn: string, from: Date, till: Date) {
    this.author = author;
    this.isbn = isbn;
    this.from = from;
    this.till = till;
  }

  public static defaultCriteria() {
    return new BrowseCriteriaDetails(undefined, undefined, undefined, undefined);
  }
}
