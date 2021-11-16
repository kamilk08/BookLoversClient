import { Identification } from '../../shared/models/identification';
import { ShelfCategory } from './shlef-category.model';
import { UUID } from 'angular2-uuid';
import { CUSTOM_SHELF, NOW_READING_SHELF, READED_SHELF, SHELF_CATEGORIES, WANTS_TO_READ_SHELF } from './shelf-categories';

export class Shelf {
  public identification: Identification
  public category: ShelfCategory
  public name: string

  public books: number[];

  constructor(shelfCategoryId: number, name: string) {
    this.identification = { id: null, guid: UUID.UUID() };
    this.name = name;
    this.category = SHELF_CATEGORIES.find(p => p.id === shelfCategoryId);
    this.books = [];
  }

  public changeShelfName(name: string) {
    this.name = name;
  }

  public setShelfId(id: number) {
    this.identification.id = id;
  }

  public static readedShelf() {
    return new Shelf(READED_SHELF.id, READED_SHELF.name);
  }

  public static nowReadingShelf() {
    return new Shelf(NOW_READING_SHELF.id, NOW_READING_SHELF.name);
  }

  public static wantsToReadShelf() {
    return new Shelf(WANTS_TO_READ_SHELF.id, WANTS_TO_READ_SHELF.name);
  }

  public static customShelf(name: string) {
    return new Shelf(CUSTOM_SHELF.id, name);
  }
}
