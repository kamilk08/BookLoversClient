import { UUID } from 'angular2-uuid';
import { Rating } from '../../../api/ratings/models/rating.model';

export class RatingsOverview {
  public id: number
  public book: {
    bookId: number,
    bookGuid: UUID,
  }
  public average: number

  public readonly ratings: Rating[];

  constructor(book: { bookId: number, bookGuid: UUID }) {
    this.book = book;
    this.ratings = [];
    this.average = 0.0;
  }

  public addRating(rating: Rating) {
    this.ratings.push(rating);

    this.average = this.recalculateAverage();
  }

  public removeRating(rating: Rating) {
    const index = this.ratings.indexOf(rating);
    this.ratings.splice(index, 1);

    if (this.ratings.length > 0)
      this.average = this.recalculateAverage();
    else this.average = 0;
  }

  public changeRating(userId: number, stars: number) {
    let rating = this.ratings.find(f => f.userId === userId);
    rating.stars = stars;

    this.average = this.recalculateAverage();
  }

  public recalculateAverage() {
    let foo = this.ratings.map((pv) => pv.stars)
      .reduce((ps, cs) => ps + cs);

    return foo / this.ratings.length;
  }

  public hasUserRating(userId: number) {
    return this.ratings.find(p => p.userId === userId) !== undefined;
  }

  public getUserRating(userId: number) {
    return this.ratings.find(p => p.userId === userId);
  }


}
