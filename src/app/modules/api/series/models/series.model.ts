import { UUID } from 'angular2-uuid'
import { Identification } from 'src/app/modules/shared'

export class Series {
  identification: Identification
  seriesName: string
  books: number[]

  constructor(name: string) {
    this.identification = {
      id: null,
      guid: UUID.UUID()
    }
    this.seriesName = name;
    this.books = [];
  }

  setSeriesId(id: number) {
    if (this.identification.id)
      return;

    this.identification.id = id;
  }
}
