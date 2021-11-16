import { UUID } from 'angular2-uuid';

export class BookPublisher {
    public publisherId: number
    public publisherGuid: UUID
    public published: Date

    constructor(id: number, guid: UUID, published: Date) {
        this.publisherId = id;
        this.publisherGuid = guid;
        this.published = published;
    }
}