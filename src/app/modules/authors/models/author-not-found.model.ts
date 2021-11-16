export class AuthorNotFound {

  public authorId: number;
  public authorGuid: string;

  public static withId(id: number) {
    const obj: AuthorNotFound = {
      authorId: id,
      authorGuid: ''
    };

    return obj;
  }

  public static withGuid(guid: string) {
    const obj: AuthorNotFound = {
      authorId: undefined,
      authorGuid: guid
    };

    return obj;
  }
}
