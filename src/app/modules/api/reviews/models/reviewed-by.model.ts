import { UUID } from 'angular2-uuid'

export class ReviewedBy {
    public userId: number
    public guid: UUID

    constructor(userId: number, guid: UUID) { 
        this.userId = userId;
        this.guid = guid;
    }
}