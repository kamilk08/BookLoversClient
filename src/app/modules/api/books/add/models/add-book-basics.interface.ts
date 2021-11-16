import { UUID } from 'angular2-uuid'

export interface AddBookBasics {
  isbn: string
  title: string
  publicationDate: Date
  category: number
  subCategory: number
  publisherGuid: UUID
}
