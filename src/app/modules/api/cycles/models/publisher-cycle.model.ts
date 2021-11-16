import { UUID } from 'angular2-uuid'
import { Identification } from 'src/app/modules/shared'

export class PublisherCycle {
  public identification: Identification
  public name: string
  public publisher: {
    id: number
    guid: UUID
  }
  public books: number[]

  constructor(name: string, publisher: { id: number, guid: UUID }) {
    this.identification = { id: undefined, guid: UUID.UUID() }
    this.name = name;
    this.publisher = publisher
    this.books = [];
  }

  setPublisherCycleId(id: number) {
    if (this.identification.id)
      return;

    this.identification.id = id;
  }

  addBook(bookId: number) {
    this.books.push(bookId);
  }

  removeBook(bookId: number) {
    const index = this.books.indexOf(bookId);
    this.books.splice(index, 1);
  }
}
