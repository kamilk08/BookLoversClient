export class PublisherNotFound {
  public readonly publisherId: number;
  public readonly publisherBookId: number

  public static withId(id: number) {
    const model: PublisherNotFound = {
      publisherId: id,
      publisherBookId: undefined
    };

    return model;
  }

  public static withBookId(bookId: number) {
    const model: PublisherNotFound = {
      publisherId: undefined,
      publisherBookId: bookId
    };

    return model;
  }
}
