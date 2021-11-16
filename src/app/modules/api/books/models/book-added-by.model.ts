import { UUID } from 'angular2-uuid';

export class BookAddedBy {
    public addedById: number
    public addedByGuid: UUID
    public userName: string

    constructor(addedById: number, addedByGuid: UUID, username?: string) {
        this.addedById = addedById;
        this.addedByGuid = addedByGuid;
        this.userName = username;
    }
}