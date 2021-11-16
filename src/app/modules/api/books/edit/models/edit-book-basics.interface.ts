import { UUID } from 'angular2-uuid'

export interface EditBookBasics {
  isbn: string
  title: string
  publicationDate: Date
  category: number
  subCategory: number
  publisherGuid: UUID
}
