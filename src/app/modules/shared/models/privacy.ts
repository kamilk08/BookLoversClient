export class Privacy {
  public id: number
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public static Private: Privacy = new Privacy(1, "Private");
  public static OtherReaders: Privacy = new Privacy(2, "Other readers");
  public static Public: Privacy = new Privacy(3, "Public")

}

export const PRIVACY_OPTIONS: Privacy[] = [Privacy.Private, Privacy.OtherReaders, Privacy.Public];
