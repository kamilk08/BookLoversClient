import { UUID } from 'angular2-uuid'

export class ReviewedBook {
    public bookId: number
    public bookGuid: UUID

    constructor(bookId: number, guid: UUID) {
        this.bookId = bookId;
        this.bookGuid = guid;
    }
}