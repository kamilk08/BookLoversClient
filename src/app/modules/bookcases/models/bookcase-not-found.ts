import { UUID } from "angular2-uuid";

export class BookcaseNotFound {
  public bookcaseId: number;

  public static withId(id: number) {
    const model: BookcaseNotFound = {
      bookcaseId: id
    };

    return model;
  }
}
