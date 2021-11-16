import { Review } from 'src/app/modules/api/reviews/models/review.model';

export interface ToggleLike {
    review: Review
    liked: boolean
}

