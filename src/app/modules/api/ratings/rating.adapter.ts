import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/modules/shared/adapter';
import { Rating } from './models/rating.model';

@Injectable()
export class RatingAdapter implements Adapter<Rating>{

  adapt(item: any): Rating {
    if (!item)
      throw Error('Invalid rating.');

    const rating: Rating = {
      id: item.id,
      bookId: item.bookId,
      userId: item.readerId,
      stars: item.stars
    };

    return rating;
  }
}
