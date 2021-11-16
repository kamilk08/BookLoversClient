import { UUID } from 'angular2-uuid';

export interface BookResponse {
  readonly id: number
  readonly guid: UUID
  readonly isbn: number
  readonly title: string
  readonly pages: number
  readonly authors: any[],
  readonly categoryId: number
  readonly subCategoryId: number
  readonly subCategoryName: string
  readonly publicationDate: Date
  readonly description: string
  readonly series: any;
  readonly positionInSeries?: number
  readonly descriptionSource: string
  readonly cycles: any[]
  readonly publisher: any
  readonly reviews: any[]
  readonly languageId: number
  readonly language: string
  readonly readerId: number
  readonly readerGuid: UUID
  readonly bookStatus: number
  readonly coverSource: string
  readonly coverTypeId: number
  readonly isCoverAdded: boolean
  readonly bookHashTags: any[]
}
