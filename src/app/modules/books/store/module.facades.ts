import { BookFacade } from "./book.facade";
import { BooksPaginationFacade } from "./pagination/books-pagination.facade";
import { BookWebPageFacade } from "./webpage/book-webpage.facade";

export const moduleFacades: any[] = [
  BooksPaginationFacade,
  BookFacade,
  BookWebPageFacade
]
