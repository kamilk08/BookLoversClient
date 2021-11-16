import { Identification } from '../../shared/models/identification';
import { Shelf } from './shelf.model';
import { UUID } from 'angular2-uuid';
import { Privacy } from '../../shared/models/privacy';
import { BookcaseSettings } from '../bookcase-settings/models/bookcase-settings.model';
import { CUSTOM_SHELF } from './shelf-categories';
import { DEFUALT_SHELF_CAPACITY } from './shelf-capacity';

export class Bookcase {
  public identification: Identification
  public userId: number
  public settings: BookcaseSettings

  public shelfs: Shelf[];

  constructor(userId: number) {
    this.identification = { id: null, guid: UUID.UUID() };
    this.userId = userId;
    this.shelfs = [Shelf.readedShelf(), Shelf.nowReadingShelf(), Shelf.wantsToReadShelf()];
    this.settings = new BookcaseSettings(DEFUALT_SHELF_CAPACITY, Privacy.Public.id);
  }

  public getCoreShelfs() {
    return this.shelfs.filter(s => s.category.id !== CUSTOM_SHELF.id).sort(SORT_SHELFS_BY_CATEGORY);
  }

  public getCustomShelves() {
    return this.shelfs.filter(s => s.category.id === CUSTOM_SHELF.id).sort(SORT_SHELFS_BY_CATEGORY);
  }

  public getShelf(id: number): Shelf;
  public getShelf(guid: UUID): Shelf;

  public getShelf(param: any) {
    if (typeof param === 'number')
      return this.shelfs.find(p => p.identification.id === param);
    else
      return this.shelfs.find(p => p.identification.guid === param);
  }


  public getShelfByCategory(categoryId: number) {
    return this.shelfs.find(p => p.category.id === categoryId);
  }

  public getShelvesWithBook(bookId: number) {
    return this.shelfs.filter(f => f.books.some(s => s === bookId));
  }

  public hasBookOnShelf(shelfId: number, bookId: number) {
    if (!bookId || !shelfId)
      return;

    let shelf = this.shelfs.find(p => p.identification.id === shelfId);
    return shelf.books.some(p => p === bookId);
  }

  public hasBook(bookId: number) {
    if (!bookId)
      return;

    let books = this.shelfs.reduce((pv, cv) => [...pv, cv.books], []);
    const hasBook = books.some(p => p.includes(bookId));
    return hasBook;
  }

  public addShelf(shelf: Shelf): Shelf
  public addShelf(shelfName: string): Shelf
  public addShelf(param: any) {
    if (param instanceof Shelf) {
      this.shelfs.push(param);
    }
    else {
      const newShelf = new Shelf(CUSTOM_SHELF.id, param);
      this.shelfs.push(newShelf);
      return newShelf;
    }

  }

  public addToShelf(shelfId: number, bookId: number) {
    let shelf = this.shelfs.find(p => p.identification.id === shelfId);
    shelf.books.push(bookId);
  }

  public removeShelf(shelf: Shelf);
  public removeShelf(id: number);
  public removeShelf(guid: UUID);

  public removeShelf(param: any) {
    const inst = typeof (param);
    if (inst === 'object') {
      this.shelfs.remove(param);
    }
    else if (typeof (param) === 'number') {
      const shelf = this.shelfs.find(p => p.identification.id === param);
      this.shelfs.remove(shelf);
    }
    else if (param instanceof UUID) {
      const shelf = this.shelfs.find(p => p.identification.guid === param);
      this.shelfs.remove(shelf);
    }

  }

  public removeFromShelf(shelfId: number, bookId: number) {
    let shelf = this.getShelf(shelfId);
    let index = shelf.books.indexOf(bookId);
    shelf.books.splice(index, 1);
  }

  public changeSettings(shelfCapacity: number, privacy: number) {
    this.settings = new BookcaseSettings(shelfCapacity, privacy);
  }
}

const SORT_SHELFS_BY_CATEGORY = (s1: Shelf, s2: Shelf) => (s1.category.id - s2.category.id);
