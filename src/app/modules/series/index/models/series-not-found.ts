export class SeriesNotFound {

  public seriesId: number;
  public bookId: number


  public static withId(id: number) {
    const model: SeriesNotFound = {
      seriesId: id,
      bookId: undefined
    };

    return model;
  }

  public static withBookId(bookId: number) {
    const model: SeriesNotFound = {
      seriesId: undefined,
      bookId: bookId
    };

    return model;
  }

}
