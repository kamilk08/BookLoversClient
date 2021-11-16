import { UUID } from 'angular2-uuid'
import { ReaderDetails } from './reader-details.model'
import { Identification, Follower } from 'src/app/modules/shared'

export class Reader {
  public identification: Identification
  public email: string
  public details: ReaderDetails
  public status: number

  constructor(details: ReaderDetails, status: number) {
    this.identification = { id: undefined, guid: UUID.UUID() }
    this.status = status;
    this.details = details;
  }
}
