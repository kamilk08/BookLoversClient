import { UUID } from 'angular2-uuid'

export class BookAuthor {
    authorId: number
    authorGuid: UUID

    constructor(authorId: number, authorGuid: UUID) { 
        this.authorId = authorId;
        this.authorGuid = authorGuid;
    }
}