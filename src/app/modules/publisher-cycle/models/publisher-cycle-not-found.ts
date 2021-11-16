export class PublisherCycleNotFound {

  public cycleId: number
  public cycleName: string

  public static withId(id: number) {
    const model: PublisherCycleNotFound = {
      cycleId: id,
      cycleName: undefined
    };

    return model;
  }

  public static withCycleName(name: string) {
    const model: PublisherCycleNotFound = {
      cycleId: undefined,
      cycleName: name
    };

    return model;
  }

}
