export class Rating {
    public id: number
    public readonly bookId: number
    public readonly userId: number
    public stars: number

    constructor(bookId: number, userId: number, stars: number) {
        this.bookId = bookId;
        this.userId = userId;
        this.stars = stars;
    }


}
