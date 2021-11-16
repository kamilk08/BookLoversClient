import { UUID } from 'angular2-uuid'
import { Identification } from '../../../shared/models/identification'

export class Publisher {
  identification: Identification
  name: string
  books: number[]
  cycles: number[]

  constructor(name: string) {
    this.name = name;
    this.identification = {
      id: null,
      guid: UUID.UUID()
    };
    this.books = [];
    this.cycles = [];
  }

  setPublisherId(id: number) {
    if (this.identification.id)
      return;

    this.identification.id = id;
  }
}
