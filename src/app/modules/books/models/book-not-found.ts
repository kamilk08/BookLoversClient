export class BookNotFound {
  public bookId: number;
  public bookGuid: string

  public static withId(id: number) {
    const model: BookNotFound = {
      bookId: id,
      bookGuid: undefined
    };

    return model;
  };

  public static withGuid(guid: string) {
    const model: BookNotFound = {
      bookId: undefined,
      bookGuid: guid
    };

    return model;
  }
}
