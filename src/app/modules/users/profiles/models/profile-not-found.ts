export class ProfileNotFound {
  public profileId: number

  public static withId(id: number) {
    const model: ProfileNotFound = {
      profileId: id
    };

    return model;
  }
}
