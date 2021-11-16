export class BookcaseOption {
  public readonly id: number
  public readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public static PrivacyOption: BookcaseOption = new BookcaseOption(1, "Privacy");
  public static ShelfCapacityOption: BookcaseOption = new BookcaseOption(2, "Shelf capacity");
}
