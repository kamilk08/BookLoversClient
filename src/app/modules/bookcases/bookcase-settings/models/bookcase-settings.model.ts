export class BookcaseSettings {

  public readonly shelfCapacity: number;
  public readonly privacy: number;

  constructor(shelfCapacity: number, privacy: number) {
    this.shelfCapacity = shelfCapacity;
    this.privacy = privacy;
  }

}
