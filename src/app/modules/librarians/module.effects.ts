import { LibrarianEffects } from "./store/librarian.effects";
import { LibrariansPaginationEffects } from "./store/pagination/librarians-pagination.effects";

export const effects: any[] = [LibrarianEffects,
  LibrariansPaginationEffects]
