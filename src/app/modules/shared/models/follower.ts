export class Follower {
    followedObjectId: number
    followedById: number

    constructor(followedObjectId: number, followedById: number) { 
        this.followedObjectId = followedObjectId;
        this.followedById = followedById;
    }
}