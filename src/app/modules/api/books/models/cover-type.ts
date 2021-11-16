export class CoverType {
  id: number
  type: string

  private constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
  }

  public static paperBack() {
    return new CoverType(1, 'Paperback');
  }

  public static hardCover() {
    return new CoverType(2, "Hardcover")
  }

  public static noCover() {
    return new CoverType(3, "No cover");
  }
}
