import { UUID } from 'angular2-uuid'

export class BookPublisherCycle {
    public id: number
    public guid: UUID

    constructor(id: number, guid: UUID) {
        this.id = id;
        this.guid = guid;
    }
}