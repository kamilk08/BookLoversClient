import { UUID } from "angular2-uuid";
import { environment } from "src/environments/environment.prod";

export const REMOVE_BOOK = (guid: UUID) => `${environment.api}/books/${guid}`
