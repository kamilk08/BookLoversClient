export class TimelineNotFound {

  public readerId: number

  public static withReaderId(id: number) {

    const model: TimelineNotFound = {
      readerId: id
    };

    return model

  }

}
